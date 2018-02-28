var CoinEffectPool = cc.Class({
    statics: {
        pool: null,
        count: 5,
        coinEffectPrefab: null,

        init: function (coinEffectPrefab,count) {
            this.coinEffectPrefab = coinEffectPrefab;
            this.count = count;
            this.pool = new cc.NodePool();
            for (let i = 0; i < this.count; ++i) {
                let coinEffect = cc.instantiate(coinEffectPrefab); // 创建节点
                this.pool.put(coinEffect); // 通过 putInPool 接口放入对象池
            }
        },

        create: function () {
            let coinEffect = null;
            if (this.pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                coinEffect = this.pool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                coinEffect = cc.instantiate(this.coinEffectPrefab);
            }
            return coinEffect;
        },

        destroy: function (coinEffect) {
            if (this.pool.size() < this.count)
                this.pool.put(coinEffect);
            else
                coinEffect.destroy();
        },
    }
});

module.exports = CoinEffectPool;