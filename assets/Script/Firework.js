var AudioManager = require("AudioManager");
cc.Class({
    extends: cc.Component,

    properties: {
        delay: 0.2,
        AudioManager: {
            default: null,
            type: AudioManager,
        }
    },

    onLoad: function () {
        this.anim = this.node.getComponent(cc.Animation);
        this.played = false;
    },

    onEnable: function () {
        this.timePassed = 0;
        this.played = false;
        this.node.opacity = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.played) {
            this.timePassed += dt;
            if (this.timePassed > this.delay) {
                this.node.opacity = 255;
                this.anim.play();
                this.AudioManager.playFirework();
                this.played = true;
            }
        }
    },
});
