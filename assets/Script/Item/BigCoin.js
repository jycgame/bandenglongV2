var ScoreSoulPool = require('ScoreSoulPool');
cc.Class({
    extends: cc.Component,
    init: function () {

    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            this.AudioManager.playBigCoin();
            this.node.destroy();
            this.GameManager.spawnNode(self.node.position, self.node.parent);

            var scoreSoulNode = ScoreSoulPool.create();
            var scoreSoul = scoreSoulNode.getComponent("ScoreSoul");
            scoreSoul.target = new cc.Vec2(-765, 491);
            scoreSoul.dir = scoreSoul.target.normalize();
            scoreSoul.GameManager = this.GameManager;
            scoreSoul.BigCoinScore = this.BigCoinScore;
            scoreSoul.DataManager = this.DataManager;

            //let targetPos = self.node.parent.convertToWorldSpaceAR(self.node.position);
            //targetPos = scoreSoulNode.parent.convertToNodeSpaceAR(targetPos);

            scoreSoulNode.position = new cc.Vec2(0,0);
            //if (scoreSoul.dir.y <= 0)
            //    scoreSoulNode.rotation = scoreSoul.dir.angle(cc.Vec2.RIGHT) * 180 / Math.PI;
            //else
            //    scoreSoulNode.rotation = -scoreSoul.dir.angle(cc.Vec2.RIGHT) * 180 / Math.PI;

        }
    },
});
