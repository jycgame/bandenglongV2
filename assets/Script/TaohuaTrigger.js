cc.Class({
    extends: cc.Component,

    properties: {
        anim: {
            default: null,
            type: cc.Animation,
        },
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            var doorTrigger = self.node.getComponent("TaohuaTrigger");
            doorTrigger.anim.play();
            doorTrigger.anim.play();
        }
    }
});
