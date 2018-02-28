var EnergySoulPool = require('EnergySoulPool');

cc.Class({
    extends: cc.Component,
    properties: {
        dragonBallPrefab:
        {
            default: null,
            type: cc.Prefab,
        },

        explosionPrefab:
        {
            default: null,
            type: cc.Prefab,
        },

        teleportGatePrefab:
        {
            default: null,
            type: cc.Prefab,
        },

        crabEnermyPrefab:
        {
            default: null,
            type: cc.Prefab,
        },
        crayfishEnermyPrefab:
        {
            default: null,
            type: cc.Prefab,
        },
        GameManagerNode:
        {
            default: null,
            type: cc.Node,
        },
        DataManagerNode:
        {
            default: null,
            type: cc.Node,
        },
        AudioManagerNode: {
            default: null,
            type: cc.Node,
        },
        gridNode:
        {
            default: null,
            type: cc.Node,
        },

        specialGroundNode: {
            default: null,
            type: cc.Node,
        },

        specialGroundCoverNode: {
            default: null,
            type: cc.Node,
        },

        cameraNode: {
            default: null,
            type: cc.Node,
        },

        speedFactorLabelNode: {
            default: null,
            type: cc.Node,
        },

        dragonBallLabelNode: {
            default: null,
            type: cc.Node,
        },

        spawnTimeLabelNode: {
            default: null,
            type: cc.Node,
        },

        hpBarNode: {
            default: null,
            type: cc.Node,
        },

        timeCountLabelNode: {
            default: null,
            type: cc.Node,
        },

        bonusEffect: {
            default: null,
            type: cc.Animation,
        },

        tipNode: {
            default: null,
            type: cc.Node,
        },
    },

    grid: null,
    GameManager: null,
    DataManager: null,
    enermyAttacking: null,
    enermyNum: null,//记录剩余敌人个数，包括没spawn的。
    finalScore: null,
    subScoreVal: null,

    dragonBallNode: null,
    dragonBallGridNode: null,
    explosionAnim: null,
    smoothCamera: null,

    speedFactorLabel: null,
    speedFactor: null,

    dragonBallLabel: null,
    dragonBallFactor: null,

    spawnTimeLabel: null,
    spawnTime: null,
    spInterval: null,

    hpBar: null,
    energyBarNode: null,

    originalSpeed: null,
    timePassed: null,
    enermyList: null,
    invincible: null,
    invincibleTimeout: null,
    attackNumTaken: null,
    energyFillNum: null,
    bonusTimeout: null,
    timeCountInterval: null,
    timeCountLabel: null,
    timeLeft: null,

    crayfishNum: null,
    crabNum: null,
    ballNum: null,
    // use this for initialization
    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");
        this.AudioManager = this.AudioManagerNode.getComponent("AudioManager");
        this.grid = this.gridNode.getComponent("Grid");
        this.smoothCamera = this.cameraNode.getComponent("SmoothCamera");
        this.enermyList = [];
        this.enermyAttacking = false;

        this.speedFactorLabel = this.speedFactorLabelNode.getComponent(cc.Label);
        this.speedFactor = 1;
        this.speedFactorLabel.string = this.speedFactor;

        this.dragonBallLabel = this.dragonBallLabelNode.getComponent(cc.Label);
        this.dragonBallFactor = 1;
        this.dragonBallLabel.string = this.dragonBallFactor;

        this.spawnTimeLabel = this.spawnTimeLabelNode.getComponent(cc.Label);
        this.spawnTimeLabel.string = this.spawnTime;

        this.hpBar = this.hpBarNode.children[0];
        this.timeCountLabel = this.timeCountLabelNode.getComponent(cc.Label);
        this.energySoulList = [];

        this.crayfishNum = 0;
        this.crabNum = 0;
        this.ballNum = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update1: function (dt) {
        if (this.enermyAttacking) {
            if (this.bonusEffectFinished) {
                this.bonusEffect.node.active = false;
                this.timePassed += dt;
                var spawnTimeIndex = this.getSpawnTimeIndex();
                if (this.spawnTime != this.DataManager.bonusIntervalValueList[spawnTimeIndex]) {
                    this.spawnTime = this.DataManager.bonusIntervalValueList[spawnTimeIndex];
                    this.startSpawn();
                }
            }
            else {
                this.bonusEffectTime += dt;
                if (this.bonusEffectTime > this.bonusEffectThrehold) {
                    this.bonusEffectFinished = true;
                    this.setupAttack();
                }
            }
        }

        if (this.quiting) {
            this.timePassed += dt;
            if (this.timePassed > this.bonusEffectReverseThrehold) {
                this.GameManager.speed = this.originalSpeed;

                this.specialGroundNode.active = false;
                this.specialGroundCoverNode.active = false;
                this.quiting = false;
                this.bonusEffect.node.active = false;
                this.GameManager.BuffControl.active = true;
            }
        }
    },

    getSpawnTimeIndex: function () {
        for (var i = 0; i < this.DataManager.bonusChangeIntervalTimeList.length - 1; i++) {
            var time = this.DataManager.bonusChangeIntervalTimeList[i + 1];
            if (this.timePassed < time)
                return i;
        }
        return this.DataManager.bonusChangeIntervalTimeList.length - 1;
    },

    spawnEnermy: function () {
        var spawnPos;
        var n = Math.random();
        if (n <= 0.25)
            spawnPos = new cc.Vec2(-960, Math.random() * 1080 - 540);
        else if (n <= 0.5)
            spawnPos = new cc.Vec2(Math.random() * 1920 - 960, -540);
        else if (n <= 0.75)
            spawnPos = new cc.Vec2(960, Math.random() * 1080 - 540);
        else
            spawnPos = new cc.Vec2(Math.random() * 1920 - 960, 540);

        var p = Math.random();
        var enermyPrefab = this.crabEnermyPrefab;
        var enermyScore = this.DataManager.bonusCrabScore;
        if (p <= parseFloat(this.DataManager.EnermyProbs[0])) {
            enermyPrefab = this.crayfishEnermyPrefab;
            enermyScore = this.DataManager.bonusCrayfishScore;
        }

        var enermyNode = cc.instantiate(enermyPrefab);
        var enermy = enermyNode.getComponent("Enermy");
        enermy.moveSpeed = this.moveSpeed;
        enermy.score = enermyScore
        enermy.path = [cc.Vec2.ZERO];
        enermy.GameManager = this.GameManager;
        enermy.DataManager = this.DataManager;
        enermy.EnermyAttackManager = this;
        enermy.speedFactor = this.speedFactor;
        enermyNode.position = spawnPos;
        enermyNode.parent = this.specialGroundNode;
        this.enermyList.push(enermy);
    },

    setupAttack: function () {
        this.timePassed = 0;
        this.spawnTime = this.DataManager.bonusIntervalValueList[0];
        this.specialGroundNode.position = this.cameraNode.position;
        this.specialGroundCoverNode.position = this.cameraNode.position;

        var dragon = this.GameManager.headNode.parent;
        dragon.setSiblingIndex(5);
        this.smoothCamera.enabled = false;
        this.specialGroundNode.active = true;
        this.specialGroundCoverNode.active = true;
        this.attackNumTaken = parseInt(this.DataManager.bonusDragonBallHP / this.DataManager.bonusCrayfishDamage);
        this.energyFillNum = parseInt(this.DataManager.bonusEnergyMax / this.DataManager.bonusEnergyFillValue);
        this.GameManager.speed = this.DataManager.bonusInitialSpeed;
        this.hpBar.width = 164;
        //生成爆炸动画
        if (!this.explosionAnim) {
            var explosionNode = cc.instantiate(this.explosionPrefab);
            explosionNode.parent = this.specialGroundNode;
            explosionNode.position = cc.Vec2.ZERO;
            this.explosionAnim = explosionNode.getComponent(cc.Animation);
        }

        //生成龙珠
        if (!this.dragonBallNode) {
            this.dragonBallNode = cc.instantiate(this.dragonBallPrefab);
            //dragonBall = dragonBallNode.getComponent("DragonBall");
            this.dragonBallNode.parent = this.specialGroundNode;
            this.dragonBallNode.position = cc.Vec2.ZERO;
        }

        this.energyBarNode = this.dragonBallNode.children[1];
        this.energyBarNode.height = 0;
        this.dragonBallNode.children[0].children[0].active = false;

        this.startSpawn();
        this.startTimeCount();
        this.bonusTimeout = setTimeout(function () {
            this.attackFinished();
        }.bind(this), this.DataManager.bonusTime * 1000);

        if (cc.sys.localStorage.getItem("bonusfirstTime") == 1) {
            this.tipNode.active = true;
            var seq = cc.sequence(cc.repeat(
                cc.sequence(
                    cc.moveBy(0.5, 0, 50),
                    cc.moveBy(0.5, 0, -50)
                ), 5), cc.fadeOut(1.0));
            this.tipNode.runAction(seq);
        }
    },

    startAttack: function () {
        this.GameManager.BuffControl.active = false;
        this.enermyAttacking = true;
        this.quiting = false;
        this.bonusEffect.node.active = true;
        this.bonusEffect.play();
        this.bonusEffectTime = 0;
        this.bonusEffectThrehold = this.bonusEffect.defaultClip.duration * (1 / this.bonusEffect.defaultClip.speed);
        this.bonusEffectReverseThrehold = this.bonusEffect.getClips()[1].duration * (1 / this.bonusEffect.getClips()[1].speed);

        this.bonusEffectFinished = false;
        this.originalSpeed = this.GameManager.speed;
        this.GameManager.speed = 0;
        this.GameManager.headNode.group = "SpecialHead";//提前取消碰撞，防止在切换过程中碰撞
    },

    startTimeCount: function () {
        this.timeCountLabel.string = this.DataManager.bonusTime;
        this.timeLeft = parseInt(this.DataManager.bonusTime);
        this.timeCountInterval = setInterval(function () {
            this.timeCountLabel.string = --this.timeLeft;
        }.bind(this), 1000);
    },

    fillEnergy: function () {
        this.energyFillNum--;
        var ratio = this.DataManager.bonusEnergyFillValue / this.DataManager.bonusEnergyMax;
        this.energyBarNode.height += 146 * Math.min(ratio, 1);

        if (this.energyFillNum == 0) {
            this.dragonBallNode.children[0].children[0].active = true;
            this.dragonBallNode.on(cc.Node.EventType.TOUCH_END, this.explosion, this);

            if (cc.sys.localStorage.getItem("bonusfirstTime")==1) {
                this.handNode = this.dragonBallNode.children[3];
                this.handNode.active = true;
                this.handNode.getComponent(cc.Animation).play();
                cc.sys.localStorage.setItem("bonusfirstTime", 0);
            }

        }
    },

    explosion: function () {
        this.AudioManager.playGoDie();
        this.explosionAnim.play();
        this.clearEnermy(true);
        this.energyBarNode.height = 0;
        this.energyFillNum = parseInt(this.DataManager.bonusEnergyMax / this.DataManager.bonusEnergyFillValue);
        this.dragonBallNode.off(cc.Node.EventType.TOUCH_END, this.explosion, this);
        this.dragonBallNode.children[0].children[0].active = false;

        if (this.handNode != null) {
            this.handNode.active = false;
        }
    },

    subScore: function () {
        this.attackNumTaken--;
        this.hpBar.width -= (this.DataManager.bonusCrayfishDamage / this.DataManager.bonusDragonBallHP)*164;

        if (this.attackNumTaken == 0) {
            this.ballNum--;
            this.attackFinished();

        }
    },

    attackFinished: function () {

        if (this.handNode != null) {
            this.handNode.active = false;
        }

        this.ballNum++;
        this.enermyAttacking = false;
        this.GameManager.headNode.group = "Head";
        var dragon = this.GameManager.headNode.parent;
        dragon.setSiblingIndex(2);
        this.smoothCamera.enabled = true;
        this.specialGroundNode.active = false;
        this.specialGroundCoverNode.active = false;
        clearInterval(this.spInterval);
        clearTimeout(this.bonusTimeout);
        clearInterval(this.timeCountInterval);
        this.GameManager.speed = this.originalSpeed;
        this.clearEnermy(false);
        this.clearEnergySoul();
        this.dragonBallNode.off(cc.Node.EventType.TOUCH_END, this.explosion, this);

        this.GameManager.inputEnabled = false;
        //this.invincible = true;
        this.invincibleTimeout = setTimeout(function () {
            this.GameManager.inputEnabled = true;
            this.invincible = false;
        }.bind(this), 1 * 1000);

        this.bonusEffect.node.active = true;
        this.bonusEffect.play("bonusEffectReverse");
        if (this.hpBar.width >= 0) {
            this.GameManager.spawnBigCoin();
        }
        this.GameManager.speed = 0;
        this.timePassed = 0;
        this.quiting = true;
        this.GameManager.resetDragon();
        this.smoothCamera.enabled = true;

    },

    clearEnermy: function (bAddScore) {
        for (var i = 0; i < this.enermyList.length; i++) {
            this.enermyList[i].node.destroy();
            if (bAddScore) {
                this.GameManager.updateScore(this.enermyList[i].score, false);
                this.GameManager.speed += this.DataManager.bonusSpeedUp;
            }
        }
        this.enermyList = [];
    },

    clearEnergySoul: function () {
        for (var i = 0; i < this.energySoulList.length; i++) {
            EnergySoulPool.destroy(this.energySoulList[i]);
        }
        this.energySoulList = [];
    },

    startSpawn: function () {
        if (this.spInterval)
            clearInterval(this.spInterval);

        this.spInterval = setInterval(function () {
            for (var i = 0; i < this.DataManager.bonusSpawnNum; i++) {
                this.spawnEnermy();
            }
        }.bind(this), this.spawnTime * 1000);
    },


    speedFactorUp: function () {
        this.speedFactor += 0.2;
        this.speedFactorLabel.string = this.speedFactor;
    },

    speedFactorDown: function () {
        this.speedFactor -= 0.2;
        this.speedFactorLabel.string = this.speedFactor;
    },

    speedFactorReset: function () {
        this.speedFactor = 1;
        this.speedFactorLabel.string = this.speedFactor;
    },

    dragonBallFactorUp: function () {
        this.dragonBallFactor += 0.2;
        this.dragonBallLabel.string = this.dragonBallFactor;
        this.dragonBallNode.scale = new cc.Vec2(this.dragonBallFactor, this.dragonBallFactor);
    },

    dragonBallFactorDown: function () {
        this.dragonBallFactor -= 0.2;
        this.dragonBallLabel.string = this.dragonBallFactor;
        this.dragonBallNode.scale = new cc.Vec2(this.dragonBallFactor, this.dragonBallFactor);
    },

    dragonBallFactorReset: function () {
        this.dragonBallFactor = 1;
        this.dragonBallLabel.string = this.dragonBallFactor;
        this.dragonBallNode.scale = new cc.Vec2(this.dragonBallFactor, this.dragonBallFactor);
    },

    spawnTimeUp: function () {
        this.spawnTime += 0.5;
        this.spawnTimeLabel.string = this.spawnTime;

        clearInterval(this.spInterval);
        this.spInterval = setInterval(function () {
            this.spawnEnermy();
        }.bind(this), this.spawnTime * 1000);
    },

    spawnTimeReset: function () {
        this.spawnTime = 3;
        this.spawnTimeLabel.string = this.spawnTime;

        clearInterval(this.spInterval);
        this.spInterval = setInterval(function () {
            this.spawnEnermy();
        }.bind(this), this.spawnTime * 1000);
    },

    spawnTimeDown: function () {
        if (this.spawnTime > 0.5) {
            this.spawnTime -= 0.5;
            this.spawnTimeLabel.string = this.spawnTime;

            clearInterval(this.spInterval);
            this.spInterval = setInterval(function () {
                this.spawnEnermy();
            }.bind(this), this.spawnTime * 1000);
        }
    },

    onDestroy: function () {
        if (this.spInterval)
            clearInterval(this.spInterval);

        if (this.invincibleTimeout)
            clearTimeout(this.invincibleTimeout);

        if (this.timeCountInterval)
            clearInterval(this.timeCountInterval);
    },

});
