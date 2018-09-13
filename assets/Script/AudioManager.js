cc.Class({
    extends: cc.Component,

    properties: {
        loseAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

        cheerAudio:
        {
            default: null,
            type: cc.AudioSource,
        },

       

        bigCoin:
        {
            default: null,
            url: cc.AudioClip,
        },

        godie: {
            default: null,
            url: cc.AudioClip,
        },

        teleportGate: {
            default: null,
            url: cc.AudioClip,
        },
        bonusStart: {
            default: null,
            url: cc.AudioClip,
        },

        hitDragonBall: {
            default: null,
            url: cc.AudioClip,
        },

        btn:cc.AudioClip,
    },

    playBigCoin: function () {
        cc.audioEngine.play(this.bigCoin);
    },

    playGoDie: function () {
        cc.audioEngine.play(this.godie);
    },

    playTeleportGate: function () {
        cc.audioEngine.play(this.teleportGate);
    },

    playBonusStart: function () {
        cc.audioEngine.play(this.bonusStart);
    },

    playHitDragonBall: function () {
        cc.audioEngine.play(this.hitDragonBall);
    },

    playBtn: function () {
        cc.audioEngine.play(this.btn);
    },
});
