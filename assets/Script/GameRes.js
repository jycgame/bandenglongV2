var InputConfig = require('InputConfig');
var GameState = require('GameState');
var GameResFocusButton = require('GameResFocusButton');

cc.Class({
    extends: cc.Component,

    properties: {
        gameManager: null,

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

        crayfishLabel: {
            default: null,
            type: cc.Label,
        },
        crabLabel: {
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

        this.rankButton = cc.find("Canvas/HUD/GameRes/RankButton");
        this.mainMenuButton = cc.find("Canvas/HUD/GameRes/MainMenuButton");
        this.playAgainButton = cc.find("Canvas/HUD/GameRes/PlayAgainButton");
    },

    // processKeyUp: function (event) {
    //     if (GameState.current != GameState.result)
    //         return;

    //     if (this.isShow == true) {

    //         var needRank = InputConfig.needRank();

    //         if (needRank != true) {

    //             if (event.keyCode == InputConfig.dpadCenter) {
    //                 if (GameResFocusButton.current == GameResFocusButton.playagain) {
    //                     this.gameManager.backToMain();
    //                     this.gameManager.AudioManager.playBtn();
    //                 }
    //                 else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
    //                     this.gameManager.backToMain1();
    //                     this.gameManager.AudioManager.playBtn();
    //                 }
    //             }
    //             else if (event.keyCode == InputConfig.dpadRight || event.keyCode == InputConfig.dpadDown) {
    //                 if (GameResFocusButton.current == GameResFocusButton.playagain) {

    //                     GameResFocusButton.current = GameResFocusButton.mainmenu;
    //                 }
    //                 else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
    //                     GameResFocusButton.current = GameResFocusButton.playagain;
    //                 }
    //             }
    //             else if (event.keyCode == InputConfig.dpadLeft || event.keyCode == InputConfig.dpadUp) {
    //                 if (GameResFocusButton.current == GameResFocusButton.playagain) {
    //                     GameResFocusButton.current = GameResFocusButton.mainmenu;
    //                 }
    //                 else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
    //                     GameResFocusButton.current = GameResFocusButton.playagain;
    //                 }
    //             }
    //         }
    //         else {
    //             if (event.keyCode == InputConfig.dpadCenter) {
    //                 if (GameResFocusButton.current == GameResFocusButton.rank) {
    //                 }
    //                 else
    //                     if (GameResFocusButton.current == GameResFocusButton.playagain) {
    //                         this.gameManager.backToMain();
    //                         this.gameManager.AudioManager.playBtn();
    //                     }
    //                     else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
    //                         this.gameManager.backToMain1();
    //                         this.gameManager.AudioManager.playBtn();
    //                     }
    //             }
    //             else if (event.keyCode == InputConfig.dpadRight || event.keyCode == InputConfig.dpadDown) {
    //                 if (GameResFocusButton.current == GameResFocusButton.rank) {
    //                     GameResFocusButton.current = GameResFocusButton.playagain;
    //                 }
    //                 else
    //                     if (GameResFocusButton.current == GameResFocusButton.playagain) {
    //                         GameResFocusButton.current = GameResFocusButton.mainmenu;
    //                     }
    //                     else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
    //                         GameResFocusButton.current = GameResFocusButton.rank;
    //                     }
    //             }
    //             else if (event.keyCode == InputConfig.dpadLeft || event.keyCode == InputConfig.dpadUp) {
    //                 if (GameResFocusButton.current == GameResFocusButton.rank) {
    //                     GameResFocusButton.current = GameResFocusButton.mainmenu;
    //                 }
    //                 else
    //                     if (GameResFocusButton.current == GameResFocusButton.playagain) {
    //                         GameResFocusButton.current = GameResFocusButton.rank;
    //                     }
    //                     else if (GameResFocusButton.current == GameResFocusButton.mainmenu) {
    //                         GameResFocusButton.current = GameResFocusButton.playagain;
    //                     }
    //             }

    //         }
    //     }

    // },

    setShow: function (show) {
        this.isShow = show;
    },

    // use this for initialization
    setup: function (img, level, score, time, crayfishNum, crabNum) {

        this.titleSprite.spriteFrame = img;
        this.setLabel(this.levelLabel, level);
        this.setLabel(this.scoreLabel, score);
        time = parseInt(time);

        this.setLabel(this.timeLabel, time);

        this.setLabel(this.crayfishLabel, crayfishNum);
        this.setLabel(this.crabLabel, crabNum);

        this.isShow = true;
        // GameResFocusButton.current = GameResFocusButton.rank;
        GameResFocusButton.current = GameResFocusButton.playagain;
        GameState.current = GameState.result;
    },

    setLabel: function (label, val) {
        label.string = val;
        label.node.children[0].getComponent(cc.Label).string = val;
    },
   
});
