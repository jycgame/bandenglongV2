cc.Class({
    extends: cc.Component,
    properties: {
        //public GameObject bodyPrefab;
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },

        EnermyAttackManagerNode: {
            default: null,
            type: cc.Node,
        },
        bodyPrefab: {
            default: null,
            type: cc.Prefab,
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
       

        //camera: {
        //    default: null,
        //    type: cc.Camera,
        //},
        //public static event Action<Vector2, Vector2> OnTurn;
    },

    sprite: null,
    // use this for initialization
    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.sprite = this.node.getComponent(cc.Sprite);
        this.setInputControl();
        this.dir = this.GameManager.initialDir;
        this.stunNode = this.node.children[0];
    },

    // called every frame, uncomment this function to activate update callback
    update1: function (dt) {
        if (this.GameManager.speed != 0) {

            var deltaPos = this.dir.mul(this.GameManager.speed * this.GameManager.speedFactor * dt);
            var newPos = this.node.position.add(deltaPos);
            this.node.setPosition(newPos);
        }
    },

    tryTurn: function (newDir) {
        if (!this.dir.equals(newDir.neg()) && !this.dir.equals(newDir)) {
            this.dir = newDir;

            var children = this.node.parent.children;
            for (var i = 1; i < children.length; ++i) {
                var child = children[i];
                var body = child.getComponent("DragonBody");
                if (!body)//最后一个是Tail
                    body = child.getComponent("DragonTail");
                body.OnHeadTurn(this.node.position, newDir);
            }
            //if (OnTurn != null)
            //    OnTurn(rdBody.position, dir);
            return true;
        }
        return false;
    },

    grow: function () {
        var bodyCount = this.node.parent.childrenCount;
        var tailNode = this.node.parent.children[bodyCount - 1];
        var DragonTail = tailNode.getComponent("DragonTail");
        var secLastNode = this.node.parent.children[bodyCount - 2];

        var newBodyNode = cc.instantiate(this.bodyPrefab);
        //this.camera.addTarget(newBodyNode);
        newBodyNode.position = tailNode.position.add(DragonTail.dir.mul(32));

        var newDragonBody = newBodyNode.getComponent("DragonBody");
        newDragonBody.TargetDist = DragonTail.TargetDist;
        newDragonBody.targetDistQueue = this.cloneArray(DragonTail.targetDistQueue);
        newDragonBody.dirQueue = this.cloneArray(DragonTail.dirQueue);
        newDragonBody.dir = DragonTail.dir;
        newDragonBody.hasTarget = DragonTail.hasTarget;
        newDragonBody.bGrowthSpawn = true;
        newDragonBody.GameManagerNode = this.GameManagerNode;
        newDragonBody.EnermyAttackManagerNode = this.EnermyAttackManagerNode;

        newBodyNode.parent = this.node.parent;
        newBodyNode.setSiblingIndex(bodyCount - 1);

        var growDir;
        if (!DragonTail.hasTarget)
            growDir = (tailNode.position.sub(secLastNode.position));
        else
            growDir = (tailNode.position.sub(DragonTail.TargetDist));
        if (growDir.mag() != 0)
            growDir = growDir.normalize();
        tailNode.setPosition(newBodyNode.position.add(growDir.mul(this.GameManager.dragonBodyGap)));
    },

    cloneArray: function (array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++)
            newArray[i] = array[i];
        return newArray;
    },

    reset: function () {
        this.node.position = new cc.Vec2(639, -1499);
        this.dir = this.GameManager.initialDir;
        this.sprite.spriteFrame = this.texUp;
        this.stunNode.y = 0;
    },

    setInputControl: function () {
        var self = this;

        // keyboard input
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed: function (keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        if (self.tryTurn(new cc.Vec2(-1, 0))) {
                            self.sprite.spriteFrame = self.texLeft;
                            self.stunNode.y = 60;
                        }
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        if (self.tryTurn(new cc.Vec2(1, 0))) {
                            self.sprite.spriteFrame = self.texRight;
                            self.stunNode.y = 60;
                        }
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        if (self.tryTurn(new cc.Vec2(0, 1))) {
                            self.sprite.spriteFrame = self.texUp;
                            self.stunNode.y = 0;
                        }
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        if (self.tryTurn(new cc.Vec2(0, -1))) {
                            self.sprite.spriteFrame = self.texDown;
                            self.stunNode.y = 0;
                        }
                        break;
                }
            },
        }, self.node);

        //touch input
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,

            //触摸开始
            onTouchesBegan: function (touches, event) {
                var touch = touches[0];
                var loc = touch.getLocation();

                this.touchStartPoint = {
                    x: loc.x,
                    y: loc.y
                };

                this.touchLastPoint = {
                    x: loc.x,
                    y: loc.y
                };

                this.touchThreshold = 1;

                //console.log("touch start");
            },

            //触摸中
            onTouchesMoved: function (touches, event) {
                var touch = touches[0];
                var loc = touch.getLocation();
                var start = this.touchStartPoint;

                //console.log("touching");
            },

            //触摸结束
            onTouchesEnded: function (touches, event) {
                if (self.GameManager.inputEnabled)
                {
                    var touch = touches[0];
                    var loc = touch.getLocation();
                    var start = this.touchStartPoint;

                    var deltaX = Math.abs(start.x - loc.x);
                    var deltaY = Math.abs(start.y - loc.y);

                    if (deltaX > deltaY && start.x > loc.x) {
                        if (self.tryTurn(new cc.Vec2(-1, 0))) {
                            self.sprite.spriteFrame = self.texLeft;
                            self.stunNode.y = 60;
                        }
                    }
                    if (deltaX > deltaY && start.x < loc.x) {
                        if (self.tryTurn(new cc.Vec2(1, 0))) {
                            self.sprite.spriteFrame = self.texRight;
                            self.stunNode.y = 60;
                        }
                    }
                    if (deltaX < deltaY && start.y > loc.y) {
                        if (self.tryTurn(new cc.Vec2(0, -1))) {
                            self.sprite.spriteFrame = self.texDown;
                            self.stunNode.y = 0;
                        }
                    }
                    if (deltaX < deltaY && start.y < loc.y) {
                        if (self.tryTurn(new cc.Vec2(0, 1))) {
                            self.sprite.spriteFrame = self.texUp;
                            self.stunNode.y = 0;
                        }
                    }
                }
               

                //console.log("touch end");
            },

        }, self.node);
    }
});


