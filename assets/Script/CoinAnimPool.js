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
                let coinAnim = cc.instantiate(coinAnimPrefab); // �����ڵ�
                // var coinAnim1 = coinAnim.getComponent(cc.Animation);
                // coinAnim1.play();
                this.pool.put(coinAnim); // ͨ�� putInPool �ӿڷ�������
            }
        },

        create: function () {
            let coinAnim = null;
            if (this.pool.size() > 0) { // ͨ�� size �ӿ��ж϶�������Ƿ��п��еĶ���
                coinAnim = this.pool.get();
            } else { // ���û�п��ж���Ҳ���Ƕ�����б��ö��󲻹�ʱ�����Ǿ��� cc.instantiate ���´���
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
