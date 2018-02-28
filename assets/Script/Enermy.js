var EnergySoulPool = require('EnergySoulPool');
cc.Class({
    extends: cc.Component,

    properties: {
        type: 0,
    },

    moveSpeed: null,
    score: null,
    dir: null,

    path: null,
    TargetDist: null,
    arrived: null,
    GameManager: null,
    EnermyAttackManager: null,
    DataManager:null,
    speed: null,
    speedFactor: null,
    // use this for initialization
    onLoad: function () {
        this.TargetDist = this.path.shift();
        this.dir = this.TargetDist.sub(this.node.position).normalize();
        this.setTex();
        this.arrived = false;
        this.setSpeed();
    },

    setSpeed: function () {
        var n = Math.random();
        var speedPropList = this.DataManager.bonusSpeedPropList;
        var propSum = 0;
        var propIndex = speedPropList.length - 1;
        for (var i = 0; i < speedPropList.length; i++) {
            var speedProp = speedPropList[i];
            propSum += speedProp;
            if (n <= propSum)
            {
                propIndex = i;
                break;
            }
        }
        this.speed = this.DataManager.bonusSpeedList[propIndex] * this.speedFactor;
    },

    update: function (dt) {
        var curPos = this.node.position;
        var deltaPos = this.dir.mul(this.speed * dt);
        var nextPos = curPos.add(deltaPos);
        this.node.setPosition(nextPos);
    },

    setTex: function () {
        if (this.dir.x>=0)
            this.node.scaleX = -1;
        else
            this.node.scaleX = 1;
        //else if (this.dir.equals(cc.Vec2.UP))
        //    this.sprite.spriteFrame = this.texUp;
        //else if (this.dir.equals(cc.Vec2.UP.neg()))
        //    this.sprite.spriteFrame = this.texDown;
    },

    refineNextDir: function (nextDir) {
        return new cc.Vec2(Math.round(nextDir.x), Math.round(nextDir.y));
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group === "SpecialHead") {

            var n = Math.random();
            if (n <= 0.5)
                this.GameManager.bunAudio1.play();
            else
                this.GameManager.bunAudio2.play();


            this.GameManager.updateScore(this.score, false);
            this.GameManager.speed += this.DataManager.bonusSpeedUp;
            //this.EnermyAttackManager.fillEnergy();
            var energySoulNode = EnergySoulPool.create();
            var energySoul = energySoulNode.getComponent("EnergySoul");
            energySoul.dir = this.dir;
            energySoul.EnermyAttackManager = this.EnermyAttackManager;
            energySoul.EnermyAttackManager.energySoulList.push(energySoulNode);
            energySoulNode.parent = this.node.parent;
            energySoulNode.position = this.node.position;
            if(this.dir.y <=0 )
                energySoulNode.rotation = this.dir.angle(cc.Vec2.RIGHT) * 180 / Math.PI;
            else 
                energySoulNode.rotation = -this.dir.angle(cc.Vec2.RIGHT) * 180 / Math.PI;

            if (this.type == 0)
                this.EnermyAttackManager.crayfishNum++;
            else if (this.type == 1)
                this.EnermyAttackManager.crabNum++;

        }
        else if (other.node.group === "DragonBall") {
            this.GameManager.AudioManager.playHitDragonBall();
            this.EnermyAttackManager.subScore();
        }

        //this.EnermyAttackManager.enermyNum--;
        //if (this.EnermyAttackManager.enermyNum === 0)
        //{
        //    this.EnermyAttackManager.attackFinished();
        //}
        this.EnermyAttackManager.enermyList.remove(this);
        this.node.destroy();
    },
});
