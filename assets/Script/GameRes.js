var InputConfig = require('InputConfig');
var GameState = require('GameState');
var GameResFocusButton = require('GameResFocusButton');

cc.Class({
    extends: cc.Component,

    properties: {
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

        scoreBuffLabel: cc.Label,
        speedBuffLabel: cc.Label,
        lifeBuffLabel: cc.Label,

        isShow: {
            default: false,
        },
    },

    setShow: function (show) {
        this.isShow = show;
    },

    // use this for initialization
    setup: function (img, level, score, time, scoreNum, speedNum, lifeNum) {

        this.titleSprite.spriteFrame = img;
        this.setLabel(this.levelLabel, level);
        this.setLabel(this.scoreLabel, score);
        time = parseInt(time);

        this.setLabel(this.timeLabel, time);

        this.setLabel(this.scoreBuffLabel, scoreNum);
        this.setLabel(this.speedBuffLabel, speedNum);
        this.setLabel(this.lifeBuffLabel, lifeNum);

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
