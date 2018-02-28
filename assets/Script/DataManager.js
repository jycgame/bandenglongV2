cc.Class({
    extends: cc.Component,

    properties: {
        GoldsNode:
        {
            default: null,
            type: cc.Node,
        },
        GameManagerNode:
        {
            default: null,
            type: cc.Node,
        },
    },

    //commondata
    csvReader: null,
    smallCoinValue: null,
    JCWDValue: null,
    crayfishTime: null,
    crabTime: null,
    crabBuffRate: null,
    bunTime: null,
    bunBuffRate: null,
    initialSpeed: null,
    speedUpRate: null,
    itemNumLimit: null,
    trapMaxNum: null,
    trapTime: null,
    minSpawnTime: null,
    maxSpawnTime: null,
    trapThrehold: null,
    bigCoinValue: null,
    crabBuffRecoverTime: null,

    levelScores: null,
    bodyLengthScores: null,
    speedUpData: null,

    probabilityGroup0: null,
    probabilityGroup1: null,
    probabilityGroup2: null,
    probabilityGroup3: null,

    monsterDataGroupList: null,

    //bonusdata
    bonusInitialSpeed: null,
    bonusTime: null,
    bonusSpawnNum: null,
    bonusChangeIntervalTimeList: null,
    bonusIntervalValueList: null,
    bonusCrayfishScore: null,
    bonusDragonBallHP: null,
    bonusCrayfishDamage: null,
    bonusEnergyMax: null,
    bonusEnergyFillValue: null,
    bonusInvincibleTime: null,
    bonusSpeedList: null,
    bonusSpeedPropList: null,
    bonusSpeedUp: null,
    bonusCrabScore: null,
    EnermyProbs: null,


    triggerBonusScoreList: null,

    onLoad: function () {
        this.csvReader = this.node.getComponent("csvReader");
        this.readCommonData();
        this.readLevelData();
        this.readProbabilityData();
        this.readBodyLengthData();
        this.readSpeedUpData();
        this.readMonsterData();
        this.readBonusData();
        this.readEnterGameData();
    },


    


    readEnterGameData: function () {
        var self = this;
        cc.loader.loadRes("Data/EnterGameData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                self.triggerBonusScoreList = [];
                var enterGameData = self.csvReader.parse(csvData);
                for (var i = 2; i < enterGameData.length; i++) {
                    self.triggerBonusScoreList[i - 2] = enterGameData[i][0];
                }
            }
        });
    },

    readBonusData: function () {
        var self = this;
        cc.loader.loadRes("Data/BonusData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var bonusData = self.csvReader.parse(csvData);
                self.bonusInitialSpeed = parseFloat(bonusData[2][1]);
                self.bonusTime = parseFloat(bonusData[3][1]);
                self.bonusSpawnNum = parseFloat(bonusData[4][1]);
                self.bonusChangeIntervalTimeList = bonusData[5][1].split(';');
                self.bonusIntervalValueList = bonusData[6][1].split(';');
                self.bonusCrayfishScore = parseFloat(bonusData[7][1]);
                self.bonusDragonBallHP = parseFloat(bonusData[8][1]);
                self.bonusCrayfishDamage = parseFloat(bonusData[9][1]);
                self.bonusEnergyMax = parseFloat(bonusData[10][1]);
                self.bonusEnergyFillValue = parseFloat(bonusData[11][1]);
                self.bonusInvincibleTime = parseFloat(bonusData[12][1]);
                self.bonusSpeedList = bonusData[13][1].split(';');
                self.bonusSpeedPropList = bonusData[14][1].split(';');
                self.bonusSpeedUp = parseFloat(bonusData[15][1].split(';'));
                self.bonusCrabScore = parseFloat(bonusData[16][1]);
                self.EnermyProbs = bonusData[17][1].split(';');
            }
        });
    },


    readMonsterData: function () {
        var self = this;
        cc.loader.loadRes("Data/MonsterGameData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var monsterData = self.csvReader.parse(csvData);
                self.monsterDataGroupList = [];
                var groupIndex = 0;
                var monsterDataGroup = [];
                for (var i = 0; i < monsterData.length - 2; i++) {
                    var curGroupIndex = parseInt(monsterData[i + 2][0]);
                    var monsterDataRow = [];
                    monsterDataRow[0] = monsterData[i + 2][1];//目标位置
                    monsterDataRow[1] = monsterData[i + 2][2].split('-');//monster其实位置列表
                    monsterDataRow[2] = monsterData[i + 2][3].split('-');//monster info列表
                    monsterDataRow[3] = monsterData[i + 2][4];// 完成任务得分

                    if (curGroupIndex === groupIndex)
                        monsterDataGroup.push(monsterDataRow);
                    else {
                        self.monsterDataGroupList.push(monsterDataGroup);
                        monsterDataGroup = [];
                        monsterDataGroup.push(monsterDataRow);
                        groupIndex = curGroupIndex;
                    }
                }
                self.monsterDataGroupList.push(monsterDataGroup);
            }
        });
    },

    readCommonData: function () {
        var self = this;
        cc.loader.loadRes("Data/CommonData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var commonData = self.csvReader.parse(csvData);
                self.smallCoinValue = parseFloat(commonData[2][1]);
                self.JCWDValue = parseFloat(commonData[3][1]);
                self.crayfishTime = parseFloat(commonData[4][1]);
                self.crabTime = parseFloat(commonData[5][1]);
                self.crabBuffRate = parseFloat(commonData[6][1]);
                self.bunTime = parseFloat(commonData[7][1]);
                self.bunBuffRate = parseFloat(commonData[8][1]);
                self.initialSpeed = parseFloat(commonData[9][1]);
                self.speedUpRate = parseFloat(commonData[10][1]);
                self.itemNumLimit = parseFloat(commonData[11][1]);
                self.trapMaxNum = parseFloat(commonData[12][1]);
                self.trapTime = parseFloat(commonData[13][1]);
                self.minSpawnTime = parseFloat(commonData[14][1]);
                self.maxSpawnTime = parseFloat(commonData[15][1]);
                self.trapThrehold = parseFloat(commonData[16][1]);
                self.bigCoinValue = parseFloat(commonData[18][1]);
                self.crabBuffRecoverTime = parseFloat(commonData[19][1]);
            }
        });
    },

    readLevelData: function () {

        var self = this;
        cc.loader.loadRes("Data/LevelData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var levelData = self.csvReader.parse(csvData);
                self.levelScores = [];
                for (var i = 0; i < levelData.length - 2; i++) {
                    self.levelScores[i] = parseFloat(levelData[i + 2][1]);
                }
            }
            if (self.GoldsNode) {
                for (var i = 0; i < self.GoldsNode.children.length; i++) {
                    var SmallCoin = self.GoldsNode.children[i].getComponent("SmallCoin");
                    if (!SmallCoin)
                        SmallCoin = self.GoldsNode.children[i].addComponent("SmallCoin");

                    SmallCoin.GameManagerNode = self.GameManagerNode;
                    SmallCoin.DataManagerNode = self.node;
                }
            }
        });
    },

    readSpeedUpData: function () {
        var self = this;
        cc.loader.loadRes("Data/SpeedUp", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var speedUpRawData = self.csvReader.parse(csvData);
                speedUpRawData.shift();
                speedUpRawData.shift();
                self.speedUpData = speedUpRawData;
                //for (var i = 0; i < speedUpRawData.length - 2; i++) {
                //    self.speedUpData[i] =[ ,parseFloat(speedUpRawData[i + 2][1])];
                //}
            }
        });
    },

    readBodyLengthData: function () {
        var self = this;
        cc.loader.loadRes("Data/BodyLengthData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var bodyLengthData = self.csvReader.parse(csvData);
                self.bodyLengthScores = [];
                for (var i = 0; i < bodyLengthData.length - 2; i++) {
                    self.bodyLengthScores[i] = parseFloat(bodyLengthData[i + 2][1]);
                }
            }
        });
    },

    readProbabilityData: function () {
        var self = this;
        cc.loader.loadRes("Data/RandomProbability", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var probabilityData = self.csvReader.parse(csvData);
                self.probabilityGroup0 = [];
                self.probabilityGroup1 = [];
                self.probabilityGroup2 = [];
                self.probabilityGroup3 = [];

                var index = 2;
                for (var i = index; i < 6; i++)
                    self.probabilityGroup0[i - index] = parseFloat(probabilityData[i][2]);

                index = 6;
                for (var i = index; i < 9; i++)
                    self.probabilityGroup1[i - index] = parseFloat(probabilityData[i][2]);

                index = 9;
                for (var i = index; i < 11; i++)
                    self.probabilityGroup2[i - index] = parseFloat(probabilityData[i][2]);

                index = 11;
                for (var i = index; i < 15; i++)
                    self.probabilityGroup3[i - index] = parseFloat(probabilityData[i][2]);
            }
        });
    }
});













