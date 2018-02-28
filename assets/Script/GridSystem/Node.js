var NodeStatus = require('NodeStatus');

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    x: null,
    y: null,
    gCost: null,//离起点的距离
    hCost: null, //离终点的距离
    parent1: null,
    nodeStatus: null,
    itemNode:null,
    // use this for initialization
    onLoad: function () {
        this.gCost = 0;
        this.hCost = 0;
        //this.nodeStatus = NodeStatus.NORMAL;
    },

    //onCollisionEnter: function (other, self) {
    //    this.nodeStatus = NodeStatus.OCCUPIED;
    //    this.node.color = new cc.Color(255, 0, 0);
    //    this.node.getComponent(cc.BoxCollider).destroy();
    //},

    fCost: function ()
    {
        return this.gCost + this.hCost;
    },
});
