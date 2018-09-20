var Guide = require('Guide');
var PlayerInfo = require('PlayerInfo');
var GameState = require('GameState');
import PersistentManager from './PersistentManager';
import Buff from "./Item/Buff";
import Bomb from "./Item/Bomb";

cc.Class({
    extends: cc.Component,

    properties: {
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        PlayerInfoNode: {
            default: null,
            type: cc.Node,
        },
        Guide: {
            default: null,
            type: Guide,
        },
        PlayerInfo: {
            default: null,
            type: PlayerInfo,
        },

        BuffParent: cc.Node,
        BombParent: cc.Node,

        gameManager: null,
        guide: null,
        gameResult: null,
    },


    skip: function () {
        //cc.director.resume();
        this.loadGameScene();
    },

    loadGameScene: function () {
        this.PlayerInfoNode.active = true;
        var gm = this.GameManagerNode.getComponent("GameManager");
        gm.speed = 250;
        gm.gameStarted = true;
        gm.inputEnabled = true;
        gm.highscore = PersistentManager.inst.highScore;
        gm.highscoreLabel.string = PersistentManager.inst.highScore.toString();
        gm.dragonHead.setInputControl();
        this.PlayerInfo.init();
        for (var i = 0; i < this.BuffParent.children.length; i++) {
            var buff = this.BuffParent.children[i].getComponent(Buff);
            buff.init();
        }
        for (var i = 0; i < this.BombParent.children.length; i++) {
            var bomb = this.BombParent.children[i].getComponent(Bomb);
            bomb.init();
        }

        this.node.active = false;
        GameState.current = GameState.play;
    },

    startGame: function () {
        var gm = this.GameManagerNode.getComponent("GameManager");
        gm.speed = 250;
        gm.gameStarted = true;
        gm.inputEnabled = true;
        gm.highscore = PersistentManager.inst.highScore;
        gm.highscoreLabel.string = PersistentManager.inst.highScore.toString();
        gm.dragonHead.setInputControl();
        this.Guide.hide();
        this.PlayerInfo.init();

        for (var i = 0; i < this.BuffParent.children.length; i++) {
            var buff = this.BuffParent.children[i].getComponent(Buff);
            buff.init();
        }
        for (var i = 0; i < this.BombParent.children.length; i++) {
            var bomb = this.BombParent.children[i].getComponent(Bomb);
            bomb.init();
        }


        // Talking data isn't available in native app
        // TDAPP.onEvent("click start");
    },

    hide: function () {
        this.node.active = false;
    },

    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        console.log("游戏开始，注册键盘事件");

        //当前的游戏状态（记录在哪个画面上)
        //注意：好几个按钮都会直接出发scene重新加载的动作，所以这里不一定被出发的时候不一定画面是在title上
        if (GameState.current == GameState.invalid)
            GameState.current = GameState.title;

        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.guide = cc.find("Canvas/HUD/Guid").getComponent("Guide");
        this.gameResult = cc.find("Canvas/HUD/GameRes").getComponent("GameRes");
    },

    onDestroy: function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyUp: function (event) {
        if (!this.gameManager.checkQuit(event)) {
            // console.log("当前的状态是：");
            // console.log(GameState.current);
            // console.log("按下的键是：");
            // console.log(event.keyCode);

            if (GameState.current == GameState.title) {
                this.gameManager.processKeyUp(event);
            }
            else if (GameState.current == GameState.help) {
                this.guide.processKeyUp(event);
            }
            else if (GameState.current == GameState.result) {
                this.gameResult.processKeyUp(event);
            }
            else if (GameState.current == GameState.rank) {
            }
        }
    },

    //为了按键的灵活，我们游戏里处理Down消息
    onKeyDown: function (event) {
        if (GameState.current == GameState.play) {
            if (this.gameManager.dragonHead != null) {
                this.gameManager.dragonHead.onKeyDown(event);
            }
        }
    },
});
