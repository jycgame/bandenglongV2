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
   
    onLoad: function () {
      
    }, 

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            this.node.destroy();
            this.GameManager.startEnermyAttack();
            this.GameManager.spawnNode(self.node.position, self.node.parent);
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
