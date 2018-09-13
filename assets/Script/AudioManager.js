cc.Class({
    extends: cc.Component,

    properties: {
        loseAudio:cc.AudioClip,
        cheerAudio:cc.AudioClip,
        bigCoin:
        {
            default: null,
            url: cc.AudioClip,
        },

        btn:cc.AudioClip,
    },

    playLose:function() {
        cc.audioEngine.play(this.loseAudio);
    },

    playCheer:function() {
        cc.audioEngine.play(this.cheerAudio);
    },

    playBigCoin: function () {
        cc.audioEngine.play(this.bigCoin);
    },

    playBtn: function () {
        cc.audioEngine.play(this.btn);
    },
});
