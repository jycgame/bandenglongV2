var CoinEffectPool = require('CoinEffectPool');
cc.Class({
    extends: cc.Component,

    // use this for initialization
    init: function () {
        var anim = this.node.getComponent(cc.Animation);
        anim.play();
        this.destroyTimeThrehold = anim.defaultClip.duration * (1 / anim.defaultClip.speed);
        this.destroyTime = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.destroyTime += dt;
        if (this.destroyTime >= this.destroyTimeThrehold) {
            CoinEffectPool.destroy(this.node);
        }
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            CoinEffectPool.destroy(this.node);
        }
    },
});
