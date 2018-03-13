var UserDataConnector = require('UserDataConnector');
var Guide = require('Guide');
var PlayerInfo = require('PlayerInfo');
var GameState = require('GameState');

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
        gameManager: null,
        guide: null,
        gameResult: null,
        rankManager: null,
    },

    // use this for initialization
    skip: function () {
        //cc.director.resume();
        this.loadGameScene();
    },

    loadGameScene: function ()
    {
        this.PlayerInfoNode.active = true;
        //this.jcwdNode.active = true;
        //this.sysjNode.active = true;
        var gm = this.GameManagerNode.getComponent("GameManager");
        var self = this;
        UserDataConnector.getHighScore(function (highscore) {
            if (!window.firstTime)
            {
                gm.speed = 250;
                gm.gameStarted = true;
                gm.inputEnabled = true;
                gm.highscore = highscore;
                gm.highscoreLabel.string = highscore;
                self.PlayerInfo.init();
                // Talking data isn't available in native app
                //TDAPP.onEvent("click start");
            }
            else 
            {
                self.Guide.show();
            }
        });

        this.node.active = false;
        GameState.current = GameState.play;
    },

    startGame: function () {
        var gm = this.GameManagerNode.getComponent("GameManager");
        gm.speed = 250;
        gm.gameStarted = true;
        gm.inputEnabled = true;
        this.Guide.hide();
        this.PlayerInfo.init();
        // Talking data isn't available in native app
        // TDAPP.onEvent("click start");
    },


    hide: function () {
        this.node.active = false;
    },

    onLoad: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        console.log("游戏开始，注册键盘事件");
        //当前的游戏状态（记录在哪个画面上)
        //注意：好几个按钮都会直接出发scene重新加载的动作，所以这里不一定被出发的时候不一定画面是在title上
        if (GameState.current == GameState.invalid) 
            GameState.current = GameState.title;

        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.guide = cc.find("Canvas/HUD/Guid").getComponent("Guide");
        this.gameResult = cc.find("Canvas/HUD/GameRes").getComponent("GameRes");
        this.rankManager = cc.find("Canvas/RankMask/Rank/RankList").getComponent("RankManager");
    },

    onDestroy: function() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyUp: function(event) {
        console.log("当前的状态是：");
        console.log(GameState.current);

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
            this.rankManager.processKeyUp(event);
        }
    }
});
