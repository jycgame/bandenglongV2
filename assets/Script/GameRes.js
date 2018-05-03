var InputConfig = require('InputConfig');
var GameState = require('GameState');
var GameResFocusButton = require('GameResFocusButton');

cc.Class({
    extends: cc.Component,

    properties: {
        gameManager : null,
        rankManager : null,

        titleSprite: {
            default: null,
            type: cc.Sprite,
        },
        levelLabel: {
            default: null,
            type: cc.Label,
        },
        scoreLabel: {
            default: null,
            type: cc.Label,
        },
        timeLabel: {
            default: null,
            type: cc.Label,
        },
        rankLabel: {
            default: null,
            type: cc.Label,
        },

        crayfishLabel: {
            default: null,
            type: cc.Label,
        },
        crabLabel: {
            default: null,
            type: cc.Label,
        },
        ballLabel: {
            default: null,
            type: cc.Label,
        },
        isShow: {
            default: false,
        },

        rankButton: null,
        playAgainButton: null,
        mainMenuButton: null,
    },

    onLoad: function () {
        //warning: function "setup" is called before this function
         this.gameManager = cc.find("GameManager").getComponent("GameManager");
         this.rankManager = cc.find("Canvas/RankMask/Rank/RankList").getComponent("RankManager");

         this.rankButton = cc.find("Canvas/HUD/GameRes/RankButton");
         this.mainMenuButton = cc.find("Canvas/HUD/GameRes/MainMenuButton");
         this.playAgainButton = cc.find("Canvas/HUD/GameRes/PlayAgainButton");
    },

    processKeyUp: function(event) {
        if (GameState.current != GameState.result)
            return;

        if (this.isShow == true) {

            if (event.keyCode == InputConfig.dpadCenter) {
                //if (GameResFocusButton.current == GameResFocusButton.rank) {
                //     this.rankManager.show();
                // }
                // else
                if (GameResFocusButton.current == GameResFocusButton.playagain) {
                    this.gameManager.backToMain();
                    this.gameManager.AudioManager.playBtn();
                }
                else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
                    this.gameManager.backToMain1();
                    this.gameManager.AudioManager.playBtn();
                }
            }
            else if (event.keyCode == InputConfig.dpadRight || event.keyCode == InputConfig.dpadDown) {
                // if (GameResFocusButton.current == GameResFocusButton.rank) {
                //     GameResFocusButton.current = GameResFocusButton.playagain;
                //     //TODO: 显示相关的focus图片

                // }
                // else 
                if (GameResFocusButton.current == GameResFocusButton.playagain) {
                    
                    GameResFocusButton.current = GameResFocusButton.mainmenu;
                }
                else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
                    // GameResFocusButton.current = GameResFocusButton.rank;
                    GameResFocusButton.current = GameResFocusButton.playagain;
                }
            }
            else if (event.keyCode == InputConfig.dpadLeft || event.keyCode == InputConfig.dpadUp) {
                // if (GameResFocusButton.current == GameResFocusButton.rank) {
                //     GameResFocusButton.current = GameResFocusButton.mainmenu;
                //     //TODO: 显示相关的focus图片

                // }
                // else
                if (GameResFocusButton.current == GameResFocusButton.playagain) {
                    //GameResFocusButton.current = GameResFocusButton.rank;
                    GameResFocusButton.current = GameResFocusButton.mainmenu;
                }
                else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
                    GameResFocusButton.current = GameResFocusButton.playagain;
                }
            }
        }
    },

    setShow: function (show) {
        this.isShow = show;
    },

    // use this for initialization
    setup: function (img, level, score, time,rank, crayfishNum, crabNum, ballNum) {

        this.titleSprite.spriteFrame = img;
        this.setLabel(this.levelLabel, level);
        this.setLabel(this.scoreLabel, score);
        time = parseInt(time);
        //var timeStr = "";
        //var min = parseInt(time / 60);
        //if (min > 0)
        //{
        //    timeStr = timeStr.concat(min);
        //    timeStr = timeStr.concat("分");
        //}
        //var sec = parseInt(time % 60);
        //timeStr = timeStr.concat(sec);
        //timeStr = timeStr.concat("秒");
        this.setLabel(this.timeLabel, time);
        if (window.isEmployee)
        {
            this.rankLabel.node.parent.parent.active = true;
            this.setLabel(this.rankLabel, rank);
        }
        else 
            this.rankLabel.node.parent.parent.active = false;

        this.setLabel(this.crayfishLabel, crayfishNum);
        this.setLabel(this.crabLabel, crabNum);
        this.setLabel(this.ballLabel, ballNum);

        this.isShow = true;
        // GameResFocusButton.current = GameResFocusButton.rank;
        GameResFocusButton.current = GameResFocusButton.playagain;
        GameState.current = GameState.result;
    },

    setLabel: function (label,val)
    {
        label.string = val;
        label.node.children[0].getComponent(cc.Label).string = val;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.rankButton.scaleX = 1;
        this.rankButton.scaleY = 1;
        this.playAgainButton.scaleX = 1;
        this.playAgainButton.scaleY = 1;
        this.mainMenuButton.scaleX = 1;
        this.mainMenuButton.scaleY = 1;
        var scale = 1.2;
        if (GameResFocusButton.current == GameResFocusButton.rank) {
            this.rankButton.scaleX = scale;
            this.rankButton.scaleY = scale;
        }
        else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
            this.mainMenuButton.scaleX = scale;
            this.mainMenuButton.scaleY = scale;
        }
        else if (GameResFocusButton.current == GameResFocusButton.playagain) {
            this.playAgainButton.scaleX = scale;
            this.playAgainButton.scaleY = scale;
        }
    },
});
