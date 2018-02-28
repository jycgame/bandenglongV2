cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initializatiuon
    onLoad: function () {
        this.bunBuffNode = this.node.children[0];
        this.crabBuffNode = this.node.children[1];
        this.crayfishBuffNode = this.node.children[2];
    },

    showBunBuff: function () {
        this.bunBuffNode.active = true;
    },

    showCrabBuff: function () {
        this.crabBuffNode.active = true;
    },

    showCrayfishBuff: function () {
        this.crayfishBuffNode.active = true;
    },

    hideBunBuff: function () {
        this.bunBuffNode.active = false;
    },

    hideCrabBuff: function () {
        this.crabBuffNode.active = false;
    },

    hideCrayfishBuff: function () {
        this.crayfishBuffNode.active = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
