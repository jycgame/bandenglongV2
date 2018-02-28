cc.Class({
    extends: cc.Component,

    properties: {
        men1Anim: {
            default: null,
            type: cc.Animation,
        },

        men2Anim: {
            default: null,
            type: cc.Animation,
        },
    },

    // use this for initialization
    //onLoad: function () {
    //},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            var doorTrigger = self.node.getComponent("DoorTrigger");
            doorTrigger.men1Anim.play();
            doorTrigger.men2Anim.play();
        }
    }
});
