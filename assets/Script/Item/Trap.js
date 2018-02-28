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

    t: null,
    disableTimeout: null,

    onLoad: function () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");
        this.EnermyAttackManager = this.EnermyAttackManagerNode.getComponent("EnermyAttackManager");

        var self = this;
        this.t = setTimeout(function () {
            self.GameManager.trapNum--;
            self.destroy1();
            //this.node.getComponent(cc.Animation).play("trapExplosion");
            self.GameManager.spawnNode(this.node.position, this.node.parent);
        }.bind(this), this.DataManager.trapTime * 1000);

        this.disableTimeout = setTimeout(function () {
            var anim = self.node.getComponent(cc.Animation);
            anim.stop();
            self.node.opacity = 255;
            self.node.getComponent(cc.BoxCollider).enabled = true;
        }.bind(this), 3 * 1000)
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            if (this.GameManager.invincibleSYSJ)
                this.GameManager.invincibleSYSJ = false;
            else if (!this.GameManager.invincible && !this.EnermyAttackManager.invincible)
                this.GameManager.gameOver();
            this.destroy1();
            this.GameManager.trapNum--;
            this.GameManager.spawnNode(self.node.position, self.node.parent);
        }
    },

    destroy1: function () {

        if (this.t)
            clearTimeout(this.t);

        if (this.disableTimeout)
            clearTimeout(this.disableTimeout);
        this.node.destroy();
    },
});
