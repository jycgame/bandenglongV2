//var GameManager = require("GameManager");
cc.Class({
    extends: cc.Component,
    properties: {
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        EnermyAttackManagerNode: {
            default: null,
            type: cc.Node,
        },
        texUp:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        texDown:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        texLeft:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        texRight:
        {
            default: null,
            type: cc.SpriteFrame,
        },
    },


    hasTarget: false,
    bGrowthSpawn: false,
    targetDistQueue: null,
    dirQueue: null,
    dir: null,
    TargetDist: null,
    sprite:null,


    // use this for initialization
    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.EnermyAttackManager = this.EnermyAttackManagerNode.getComponent("EnermyAttackManager");
        this.sprite = this.node.getComponent(cc.Sprite);
        if (!this.bGrowthSpawn) {
            this.targetDistQueue = [];
            this.dirQueue = [];
            this.dir = this.GameManager.initialDir;
            this.hasTarget = false;
        }
        this.setTex();
    },

    OnHeadTurn: function (headPos, newDir) {
        this.targetDistQueue.push(headPos);
        this.dirQueue.push(newDir);
        if (!this.hasTarget) {
            this.TargetDist = this.targetDistQueue.shift();
            this.hasTarget = true;
        }
    },

    update1: function (dt) {
        if (this.GameManager.speed != 0) {
            var curPos = this.node.position;
            var deltaDir = this.dir.mul(this.GameManager.speed * this.GameManager.speedFactor * dt);
            var nextPos = curPos.add(deltaDir);
            if (this.hasTarget) {
                var nextDir = this.TargetDist.sub(nextPos);
                if (nextDir.mag() != 0) {
                    nextDir = nextDir.normalize();
                    if (!this.refineNextDir(nextDir).equals(this.dir))//如果走过了targetDist, 强制移动到targetDist
                    {
                        this.dir = this.dirQueue.shift();
                        this.setTex();

                        var restDist = this.TargetDist.sub(nextPos).mag();//走过targetDist了多少距离
                        nextPos = this.TargetDist.add(this.dir.mul(restDist));

                        if (this.targetDistQueue.length > 0)
                            this.TargetDist = this.targetDistQueue.shift();
                        else
                            this.hasTarget = false;
                    }
                }
            }
            this.node.setPosition(nextPos);
        }
    },

    setTex: function () {
        if (this.dir.equals(cc.Vec2.RIGHT))
            this.sprite.spriteFrame = this.texRight;
        else if (this.dir.equals(cc.Vec2.RIGHT.neg()))
            this.sprite.spriteFrame = this.texLeft;
        else if (this.dir.equals(cc.Vec2.UP))
            this.sprite.spriteFrame = this.texUp;
        else if (this.dir.equals(cc.Vec2.UP.neg()))
            this.sprite.spriteFrame = this.texDown;
    },

    refineNextDir: function (nextDir) {
        return new cc.Vec2(Math.round(nextDir.x), Math.round(nextDir.y));
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group === "Head" && !this.EnermyAttackManager.invincible) {
            this.GameManager.gameOver();
        }
    },
    reset: function (pos) {
        this.node.position = pos;
        this.targetDistQueue = [];
        this.dirQueue = [];
        this.dir = this.GameManager.initialDir;
        this.hasTarget = false;
        this.setTex();
    },

});
