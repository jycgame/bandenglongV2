var CoinAnimPool = require('CoinAnimPool');
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

	start: function () {
		this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");
        this.bAnim = false;
	},
	onCollisionEnter: function (other, self) {
        if (other.node.name === "Head") {
            var n = Math.random();
            if(n <= 0.2)
                this.GameManager.coinAudio1.play();
            else
                this.GameManager.coinAudio2.play();

            this.GameManager.updateScore(this.DataManager.smallCoinValue, true);
            this.GameManager.updateSpeedUpScore(this.DataManager.smallCoinValue);
            this.node.opacity = 0; 
           
            var smallCoin = self.node.getComponent("SmallCoin");

            smallCoin.coinAnimNode = CoinAnimPool.create();
            smallCoin.coinAnimNode.position = self.node.position;
            var action = cc.moveBy(0.1, new cc.Vec2(0,80));
            smallCoin.coinAnimNode.runAction(action);

            smallCoin.timePassed = 0;
            var coinAnim = smallCoin.coinAnimNode.getComponent(cc.Animation);
            coinAnim.play();
            //var coinAnimClip = coinAnim.defaultClip;
            //smallCoin.timeThrehold = coinAnimClip.duration * (1 / coinAnimClip.speed);
            smallCoin.bAnim = true;
            this.GameManager.spawnNode(self.node.position, self.node.parent);
		}
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.bAnim) {
            this.timePassed += dt;
            if (this.timePassed >= 0.4) {
                CoinAnimPool.destroy(this.coinAnimNode);
                //this.coinAnim.node.getComponent(cc.Sprite).spriteFrame = null;
                this.bAnim = false;
                this.node.opacity = 255; 
                this.GameManager.destroyCoin(this.node);
            }
        }
    },
    
});
