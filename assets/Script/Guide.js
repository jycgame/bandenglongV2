var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,

    properties: {
       main: null,
    },

    onLoad: function() {
        this.main = cc.find("Canvas/HUD/Main").getComponent("Main");
        this.AudioManager = cc.find("AudioManager").getComponent("AudioManager");
    },

    processKeyUp: function(event) {
        if (GameState.current != GameState.help) return;
        
        if (event.keyCode == InputConfig.dpadCenter) {
            this.main.startGame();
            GameState.current = GameState.play;
            this.AudioManager.playBtn();
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
