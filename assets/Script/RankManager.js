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
        //record the previous state since Rank panel will show during differenct stack
        previousGameState: null,
        closeButton: null,
        startGameButton: null,
        playAgainButton: null,
    }),

    onLoad: function() {

        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.main = cc.find("Canvas/HUD/Main").getComponent("Main");
        this.AudioManager = cc.find("AudioManager").getComponent("AudioManager");
        this.closeButton = cc.find("Canvas/RankMask/Rank/CloseButton");
        this.playAgainButton = cc.find("Canvas/RankMask/Rank/PlayAgainButton");
        this.startGameButton = cc.find("Canvas/RankMask/Rank/StartGameButton");

    },

    processKeyUp: function(event) {
        
       
    },

    setTop5: function (caller, dataList) {
        for (var i = 0; i < dataList.length; i++) {
            var dataRow = dataList[i].split(",");
            var name = dataRow[1];
            var nickname = dataRow[2];
            if (nickname.length >= 11) {
                nickname = nickname.slice(0, nickname.length-4).concat("****");
            }

            var highscore = dataRow[3];
            var lastrank = dataRow[4];

            var rankItem = caller.node.children[i].getComponent("RankItem");
            rankItem.setup(name, nickname, highscore, lastrank, i + 1);
            //rankListComponent.setItem(i, i + 1 + ".", lastRank, userName, responseHighScore);
        }
        // UserDataConnector.getRank(caller, caller.setRank, null, null);

    },

    setRank: function (caller, dataRow) {
            var dataRow = dataRow.split(",");
            var name = dataRow[1];
            var nickname = dataRow[2];
            var highscore = dataRow[3];
            var lastrank = dataRow[4];
            var rank = dataRow[5];
            caller.PlayerRank.setup(name, nickname, highscore, lastrank, rank)
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

        this.previousGameState = GameState.current;
        GameState.current = GameState.rank;
    },

    hide: function () {
        this.rankBtn.node.active = true;
        this.node.parent.parent.active = false;
        this.startBtn.interactable = true;
        this.helpBtn.node.active = true;

        if (this.previousGameState != GameState.invalid) {
            GameState.current = this.previousGameState;
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.closeButton.scaleX = 1;
        this.closeButton.scaleY = 1;
        this.playAgainButton.scaleX = 1;
        this.playAgainButton.scaleY = 1;
        this.startGameButton.scaleX = 3;
        this.startGameButton.scaleY = 3;
        var scale = 1.2;
        if (RankManagerButton.current == RankManagerButton.close) {
            this.closeButton.scaleX = scale;
            this.closeButton.scaleY = scale;
        }
        else {
            if(this.startBtn2.node.active) {
                this.startGameButton.scaleX = 3.2;
                this.startGameButton.scaleY = 3.2;
            }
            else {
                this.playAgainButton.scaleX = scale;
                this.playAgainButton.scaleY = scale;
            }
        }
    },
});
