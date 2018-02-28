cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0.1,
    },

    // use this for initialization
    init: function () {
        this.label = this.node.getComponent(cc.Label);
        this.anim = this.node.getComponent(cc.Animation);
        this.curScore = 0;
        this.targetScore = 0;
        this.timePassed = 0;
        this.defaultY = this.node.y;
    },

    show: function () {
        this.node.y = this.defaultY;
        this.node.opacity = 255;
        this.curScore = 0;
        this.targetScore = 0;
        this.timePassed = 0;
        this.label.string = 0;
        this.node.active = true;
        this.node.children[0].active = true;
    },

    hide: function () {
        this.anim.play();
    },

    deactive: function () {

        this.node.active = false;
    },

    setTargetScore:function(val)
    {
        this.targetScore += val;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.curScore < this.targetScore)
        {
            this.timePassed += dt;
            if (this.timePassed >= this.speed)
            {
                this.curScore += 1;
                this.label.string = this.curScore;
                this.timePassed = 0;
            }
        }
     },
});
