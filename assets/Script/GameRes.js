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
    },

    onLoad: function () {
        //warning: function "setup" is called before this function
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
         this.gameManager = cc.find("GameManager").getComponent("GameManager");
         console.log(this.gameManager);
         this.rankManager = cc.find("Canvas/RankMask/Rank/RankList").getComponent("RankManager");
         
         console.log(this.rankManager);
    },

    onDestroy: function() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function(event) {
        if (GameState.current != GameState.result)
            return;

        console.log("[bandenglong] GameRes onKeyDown!");

        console.log(this.isShow);

        if (this.isShow == true) {

            console.log("[onKeyDown]: l59");

            if (event.keyCode == InputConfig.dpadCenter) {
                console.log("bandenglong onKeyDown");
                if (GameResFocusButton.current == GameResFocusButton.rank) {
                    this.rankManager.show();
                }
                else if (GameResFocusButton.current == GameResFocusButton.playagain) {
                    this.gameManager.backToMain();
                }
                else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
                    this.gameManager.backToMain1();
                }
            }
            else if (event.keyCode == InputConfig.dpadLeft) {
                if (GameResFocusButton.current == GameResFocusButton.rank) {
                    GameResFocusButton.current = GameResFocusButton.playagain;
                    console.log(GameResFocusButton.current);
                    //TODO: 显示相关的focus图片

                }
                else if (GameResFocusButton.current == GameResFocusButton.playagain) {
                    
                    GameResFocusButton.current = GameResFocusButton.mainmenu;
                    console.log(GameResFocusButton.current);
                }
                else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
                    GameResFocusButton.current = GameResFocusButton.rank;
                    console.log(GameResFocusButton.current);
                }
            }
        }
    },

    setShow: function (show) {
        this.isShow = show;
    },

    // use this for initialization
    setup: function (img, level, score, time,rank, crayfishNum, crabNum, ballNum) {

        console.log("real GameRes.setup called.");

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

        console.log("start to assign isShow.")
        console.log(this.isShow);
        this.isShow = true;
        GameResFocusButton.current = GameResFocusButton.rank;

        console.log("now the isShow is");
        console.log(this.isShow);

        GameState.current = GameState.result;
    },

    setLabel: function (label,val)
    {
        label.string = val;
        label.node.children[0].getComponent(cc.Label).string = val;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
