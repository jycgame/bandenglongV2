cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // use this for initialization
    show: function () {
        this.node.active = true;
    },

    hide: function () {
        this.node.active = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
