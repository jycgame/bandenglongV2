var ScoreSoulPool = cc.Class({
    statics: {
        pool: null,
        count: 10,
        scoreSoulPrefab: null,
        parent: null,

        init: function (scoreSoulPrefab,parent) {
            this.scoreSoulPrefab = scoreSoulPrefab;
            this.parent = parent;
            this.pool = new cc.NodePool();
            for (let i = 0; i < this.count; ++i) {
                let scoreSoul = cc.instantiate(scoreSoulPrefab); // 创建节点
                this.pool.put(scoreSoul); // 通过 putInPool 接口放入对象池
            }
        },

        create: function () {
            let scoreSoul = null;
            if (this.pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                scoreSoul = this.pool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                scoreSoul = cc.instantiate(this.scoreSoulPrefab);
            }
            scoreSoul.parent = this.parent;
            return scoreSoul;
        },

        destroy: function (scoreSoul) {
            if (this.pool.size() < this.count)
                this.pool.put(scoreSoul);
            else
                scoreSoul.destroy();
        },
    }
});

module.exports = ScoreSoulPool;