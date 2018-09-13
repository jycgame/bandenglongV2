var NodeStatus = require('NodeStatus');

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    x: null,
    y: null,
    gCost: null,//�����ľ���
    hCost: null, //���յ�ľ���
    parent1: null,
    nodeStatus: null,
    itemNode:null,
    // use this for initialization
    onLoad: function () {
        this.gCost = 0;
        this.hCost = 0;
        //this.nodeStatus = NodeStatus.NORMAL;
    },

    fCost: function ()
    {
        return this.gCost + this.hCost;
    },
});
