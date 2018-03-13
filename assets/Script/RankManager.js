var UserDataConnector = require('UserDataConnector');
var PlayerRank = require('PlayerRank');
var InputConfig = require('InputConfig');
var GameState = require('GameState');
var RankManagerButton = require('RankManagerButton');

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
        rankManager: null,
        //record the previous state since Rank panel will show during differenct stack
        previousGameState: null,
    }),

    onLoad: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);

        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.main = cc.find("Canvas/HUD/Main").getComponent("Main");
        this.rankManager = cc.find("Canvas/RankMask/Rank/RankList").getComponent("RankManager");

        RankManagerButton.current = RankManagerButton.other;

        console.log("[RankManager:]");
        console.log("onLoad: function()");
    },

    onDestroy: function() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyDown, this);
    },

    onKeyDown: function(event) {
        
        if (GameState.current != GameState.rank) return;

        console.log("RankManager onKeyDown");
        console.log(GameState.current);

        if (event.keyCode == InputConfig.dpadRight) {
            if (RankManagerButton.current == RankManagerButton.other) {
                RankManagerButton.current = RankManagerButton.close;
                console.log("close button focused.");
            }
            else {
                RankManagerButton.current = RankManagerButton.other;
                console.log("play again focused.");
            }
        }
        else if (event.keyCode == InputConfig.dpadCenter) {

            if (RankManagerButton.current == RankManagerButton.other) {
                if (this.playAgainBtn.node.active) {
                    this.gameManager.backToMain();
                }
                else {
                    this.hide();
                    this.main.loadGameScene();
                }
            }
            else {
                if (this.previousGameState != GameState.invalid) {
                    this.rankManager.hide();        
                }
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

        console.log("RankManager show() called.");

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

        //
        console.log(this.node.parent.parent.active);
        
        this.previousGameState = GameState.current;
        console.log(this.previousGameState);
        // GameState.current = GameState.rank;
    },

    hide: function () {

        console.log("RankManager hide() called.");
        this.rankBtn.node.active = true;
        this.node.parent.parent.active = false;
        this.startBtn.interactable = true;
        this.helpBtn.node.active = true;

        
        console.log("this hide");
        console.log("GameState change to: ");
        console.log(GameState.current);
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.node.parent.parent.active) {
            GameState.current = GameState.rank;
        }
    },
});
