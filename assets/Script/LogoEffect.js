cc.Class({
    extends: cc.Component,

    properties: {
        intervalMin: 1,
        intervalMax: 3,
    },

    onLoad: function () {
        this.anim = this.node.getComponent(cc.Animation);
    },

    onEnable: function () {
        this.anim.play();
        this.timeCount = 0;
        this.interval = this.intervalMin + (this.intervalMax - this.intervalMin) * Math.random() + this.anim.defaultClip.duration;
    },

    onDisable: function () {
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timeCount += dt;
        if (this.timeCount >= this.interval) {
            this.anim.play();
            this.timeCount = 0;
            this.interval = this.intervalMin + (this.intervalMax - this.intervalMin) * Math.random() + this.anim.defaultClip.duration;
        }
    },
});
