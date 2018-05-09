cc.Class({
    extends: cc.Component,

    start () {
        this.time = 0;
    },

    update (dt) {
        this.time += dt;
        if(this.time >= 2)
        {
            cc.director.loadScene("Level_1");
        }
    },
});
