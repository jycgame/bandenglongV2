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
        EnermyAttackManagerNode: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad: function () {
        if (this.GameManagerNode)
            this.GameManager = this.GameManagerNode.getComponent("GameManager");
        if (this.DataManagerNode)
            this.DataManager = this.DataManagerNode.getComponent("DataManager");
        this.EnermyAttackManager = this.EnermyAttackManagerNode.getComponent("EnermyAttackManager");
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head" && !this.EnermyAttackManager.invincible) {
            this.GameManager.gameOver();
        }
    },
});
