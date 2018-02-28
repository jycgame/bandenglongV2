cc.Class({
    extends: cc.Component,

    properties: {
        rankItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    init: function () {
        //var myDate = new Date()
        //var year = myDate.getFullYear();
        //var mouth = myDate.getMonth()+1;
        //var day = myDate.getDate();

        //if (year == 2017 && mouth == 11 && day == 13)
        //{
            //this.node.parent.parent.parent.parent.active = true;
            //this.csvReader = this.node.getComponent("csvReader");
            //this.readRankData();
        //}
    },

    readRankData: function () {
        var self = this;
        cc.loader.loadRes("Data/RankData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var rankData = self.csvReader.parse(csvData);
                rankData.shift();
                var rankRows = rankData;
                self.fillRankList(rankRows);
            }
        });
    },

    fillRankList: function (rankRows) {
        for (var i = 0; i < rankRows.length; i++) {
            var rankItem = null;
            if (i <= 4) {
                rankItem = this.node.children[i];
                var rankItemComp = rankItem.getComponent("RankItem");
                rankItemComp.setupFinalRank(rankRows[i][1], rankRows[i][2], rankRows[i][3]);
            }
            else {
               // rankItem = cc.instantiate(this.rankItemPrefab);
               // rankItem.parent = this.node;
                rankItem = this.node.children[i];
                var rankItemComp = rankItem.getComponent("RankItem");
                rankItemComp.setupFinalRank1(rankRows[i][1], rankRows[i][2], rankRows[i][3], i + 1);
            }
        }
    },

    hide: function () {
        this.node.parent.parent.parent.parent.active = false;
    },


});
