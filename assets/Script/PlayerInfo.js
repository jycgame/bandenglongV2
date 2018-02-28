cc.Class({
    extends: cc.Component,

    properties: {
        highScoreNode: {
            default: null,
            type: cc.Node,
        },
        highScoreSpriteNode: {
            default: null,
            type: cc.Node,
        },
    },

    // use this for initialization
    init: function () {
        if (window.isEmployee) {
            this.highScoreNode.active = true;
            this.highScoreSpriteNode.active = true;
        }
        else {
            this.highScoreNode.active = false;
            this.highScoreSpriteNode.active = false;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
