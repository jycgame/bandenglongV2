cc.Class({
    extends: cc.Component,

    start() {
        this.logo2 = this.node.children[1];
        this.logo3 = this.node.children[0];

        this.logo2.opacity = 0;
        this.logo3.opacity = 0;

     
            this.logo2.runAction( cc.sequence(
                cc.fadeIn(1),
                cc.fadeOut(1),
            ));

        this.scheduleOnce(function() {
            this.logo3.runAction(
                cc.fadeIn(1),
            );
        }, 2);
        this.time = 0;
    },

    update (dt) {
        this.time += dt;
        if(this.time >= 4)
        {
            cc.director.loadScene("Level_1");
        }
    },
});
