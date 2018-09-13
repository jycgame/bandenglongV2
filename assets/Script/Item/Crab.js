cc.Class({
    extends: cc.Component,

    properties:
    {
        GameManagerNode: {
            default: null,
            type: cc.Node,
        },
        DataManagerNode: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {

            var n = Math.random();
            if (n <= 0.5)
                cc.audioEngine.play(this.GameManager.crabAudio1);
            else
                cc.audioEngine.play(this.GameManager.crabAudio2);
            this.GameManager.specialItemNum--;
            this.GameManager.setCrabBuff();
            this.node.destroy();
            this.GameManager.spawnNode(self.node.position, self.node.parent);
        }
    },

});
