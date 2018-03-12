var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,

    properties: {
       main: null,
    },

    onLoad: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.main = cc.find("Canvas/HUD/Main").getComponent("Main");
    },

    onDestroy: function() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function(event) {
        if (event.keyCode == InputConfig.dpadCenter) {
            this.main.startGame();
            GameState.current = GameState.play;
        }
    },


    // use this for initialization
    show: function () {
        this.node.active = true;
        GameState.current = GameState.help;
    },

    hide: function () {
        this.node.active = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
