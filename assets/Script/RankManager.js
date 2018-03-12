var UserDataConnector = require('UserDataConnector');
var PlayerRank = require('PlayerRank');
var InputConfig = require('InputConfig');
var GameState = require('GameState');

cc.Class({
    extends: cc.Component,

    properties:()=> ({
        GameManager: {
            default: null,
            type: require('GameManager'),
        },
        PlayerRank: {
            default: null,
            type: PlayerRank,
        },
        startBtn: {
            default: null,
            type: cc.Button,
        },
        playAgainBtn: {
            default: null,
            type: cc.Button,
        },
        startBtn2: {
            default: null,
            type: cc.Button,
        },

        rankBtn: {
            default: null,
            type: cc.Button,
        },

        helpBtn: {
            default: null,
            type: cc.Button,
        },

        gameManager: null,
        main: null,
    }),

    onLoad: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.main = cc.find("Canvas/HUD/Main").getComponent("Main");

        console.log("[RankManager:]");
        console.log("onLoad: function()");
    },

    onDestroy: function() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function(event) {
        
        console.log("[RankManager]:");
        console.log(GameState.current);

        if (GameState.current != GameState.rank) return;

        

        if (event.keyCode == InputConfig.dpadCenter) {
            if (this.playAgainBtn.node.active) {
                this.gameManager.backToMain();
            }
            else {
                this.hide();
                this.main.loadGameScene();
            }
        }
    },

    setTop5: function (caller, dataList) {
        for (var i = 0; i < dataList.length; i++) {
            var dataRow = dataList[i].split(",");
            var name = dataRow[1];
            var nickname = dataRow[2];
            var highscore = dataRow[3];
            var lastrank = dataRow[4];

            var rankItem = caller.node.children[i].getComponent("RankItem");
            rankItem.setup(name, nickname, highscore, lastrank, i + 1);
            //rankListComponent.setItem(i, i + 1 + ".", lastRank, userName, responseHighScore);
        }
        UserDataConnector.getRank(caller, caller.setRank, null, null);

    },

    setRank: function (caller, dataRow) {
        if (window.isEmployee)
        {
            var dataRow = dataRow.split(",");
            var name = dataRow[1];
            var nickname = dataRow[2];
            var highscore = dataRow[3];
            var lastrank = dataRow[4];
            var rank = dataRow[5];
            caller.PlayerRank.setup(name, nickname, highscore, lastrank, rank)
        }
        else 
            caller.PlayerRank.setup("未登录", "", 0, 0, 0)
        
    },

    show: function () {
        if (this.GameManager.time <= 0) {
            this.startBtn2.node.active = true;
            this.playAgainBtn.node.active = false;
        }
        else {
            this.startBtn2.node.active = false;
            this.playAgainBtn.node.active = true;
        }
        this.rankBtn.node.active = false;
        this.startBtn.interactable = false;
        this.node.parent.parent.active = true;
        this.helpBtn.node.active = false;

        GameState.current = GameState.rank;
    },

    hide: function () {
        this.rankBtn.node.active = true;
        this.node.parent.parent.active = false;
        this.startBtn.interactable = true;
        this.helpBtn.node.active = true;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
