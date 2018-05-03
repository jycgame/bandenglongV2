var InputConfig = {

    //小米TV的输入
    // activeDevice : "miui TV",
    // dpadLeft : cc.KEY.dpadLeft,
    // dpadRight : cc.KEY.dpadRight,
    // dpadUp : cc.KEY.dpadUp,
    // dpadDown : cc.KEY.dpadDown,
    // dpadCenter : cc.KEY.dpadCenter,
    // back: cc.KEY.back,

    //PC输入
    activeDevice : "PC", 
    dpadLeft : cc.KEY.left,
    dpadRight : cc.KEY.right,
    dpadUp : cc.KEY.up,
    dpadDown : cc.KEY.down,
    dpadCenter : cc.KEY.enter,

    activeDevice: function() {
        return this.activeDevice;
    }

};

module.exports = InputConfig;