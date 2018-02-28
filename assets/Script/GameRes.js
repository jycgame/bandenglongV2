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
