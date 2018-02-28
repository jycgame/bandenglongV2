cc.Class({
    statics: {
        pool: null,
        count: 20,
        coinAnimPrefab: null,
        parent:null,

        init: function (coinAnimPrefab, count,parent) {
            this.coinAnimPrefab = coinAnimPrefab;
            this.count = count;
            this.parent = parent;
            this.pool = new cc.NodePool();
            for (let i = 0; i < this.count; ++i) {
                let coinAnim = cc.instantiate(coinAnimPrefab); // 创建节点
                this.pool.put(coinAnim); // 通过 putInPool 接口放入对象池
            }
        },

        create: function () {
            let coinAnim = null;
            if (this.pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                coinAnim = this.pool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                coinAnim = cc.instantiate(this.coinAnimPrefab);
            }
            coinAnim.parent = this.parent;
            return coinAnim;
        },

        destroy: function (coinAnim) {
            if (this.pool.size() < this.count)
                this.pool.put(coinAnim);
            else
                coinAnim.destroy();
        },
    }
});
