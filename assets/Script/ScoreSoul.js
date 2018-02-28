var ScoreSoulPool = require('ScoreSoulPool');
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 500,
    },

    // use this for initialization
    //onLoad: function () {

    //},

    update: function (dt) {
        var curPos = this.node.position;
        var deltaPos = this.dir.mul(this.speed * dt);
        var nextPos = curPos.add(deltaPos);
        this.node.setPosition(nextPos);

        if (this.target.sub(this.node.position).mag()<=50)
        {
            this.GameManager.updateScore(this.DataManager.bigCoinValue, false);
            this.BigCoinScore.setTargetScore(this.DataManager.bigCoinValue);
            ScoreSoulPool.destroy(this.node);
        }
    },

    //onCollisionEnter: function (other, self) {
    //    if (other.node.group === "DragonBall") {
    //        //this.EnermyAttackManager.fillEnergy();
    //        //this.EnermyAttackManager.energySoulList.remove(this.node);
    //        EnergySoulPool.destroy(this.node);
    //    }
    //},
});
