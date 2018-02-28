var EnergySoulPool = cc.Class({
    statics: {
        pool: null,
        count: 5,
        energySoulPrefab: null,

        init: function (energySoulPrefab) {
            this.energySoulPrefab = energySoulPrefab;
            this.pool = new cc.NodePool();
            for (let i = 0; i < this.count; ++i) {
                let energySoul = cc.instantiate(energySoulPrefab); // 创建节点
                this.pool.put(energySoul); // 通过 putInPool 接口放入对象池
            }
        },

        create: function () {
            let energySoul = null;
            if (this.pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                energySoul = this.pool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                energySoul = cc.instantiate(this.energySoulPrefab);
            }
            return energySoul;
        },

        destroy: function (energySoul) {
            if (this.pool.size() < this.count)
                this.pool.put(energySoul);
            else
                energySoul.destroy();
        },
    }
});


module.exports = EnergySoulPool;