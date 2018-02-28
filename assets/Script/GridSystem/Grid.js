var NodeStatus = require('NodeStatus');

cc.Class({
    extends: cc.Component,

    properties: {
        xCount: 20,
        yCount: 20,
        offsetX: 0,
        offsetY: 0,
        nodeSize: 100,
        nodePrefab:
        {
            default: null,
            type: cc.Prefab,
        },

        goldsNode:
        {
            default: null,
            type: cc.Node,
        }

    },

    nodes: null,
    lenX: null,
    lenY: null,

    onLoad: function () {
        this.createGrid();
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    //onKeyDown: function (event) {
    //    var startNode = this.nodes[22][3];
    //    var endNode = this.nodes[15][5];
    //    var path = this.getPath(startNode, endNode);
    //    for (var i = 0; i < path.length; i++) {
    //        path[i].node.color = new cc.Color(0, 0, 255);
    //    }
    //},

    createGrid: function () {
        this.nodes = [];
        this.lenX = this.xCount * this.nodeSize;
        this.lenY = this.yCount * this.nodeSize;
        var originX = this.node.position.x - this.lenX / 2 + this.nodeSize / 2 + this.offsetX;
        var originY = this.node.position.y - this.lenY / 2 + this.nodeSize / 2 + this.offsetY;
        for (var i = 0; i < this.xCount; i++) {
            var x = originX + i * this.nodeSize;
            var nodesRow = [];
            for (var j = 0; j < this.yCount; j++) {
                var y = originY + j * this.nodeSize;
                var nodeObj = this.createNodeObj("Node" + i + j, x, y, i, j);
                nodesRow[j] = nodeObj.getComponent("Node");
            }
            this.nodes[i] = nodesRow;
        }

        //遍历所有金币，找出能走的node,并匹配金币和node
        for (var i = 0; i < this.goldsNode.childrenCount; i++) {
            var coinNode = this.goldsNode.children[i];
            var node = this.getNodeFromPosition(coinNode.position);
            if (node) {
                node.nodeStatus = NodeStatus.NORMAL;
                node.node.color = new cc.Color(255, 0, 0);
                node.itemNode = coinNode;
            }
        }

    },

    getNodeFromPosition: function (position) {
        var x = parseInt((position.x + this.lenX / 2 - this.node.position.x) / this.nodeSize);
        var y = parseInt((position.y + this.lenY / 2 - this.node.position.y) / this.nodeSize);
        if (x < this.xCount && y < this.yCount)
            return this.nodes[x][y];
        else
            return null;
    },

    createNodeObj: function (name, xPos, yPos, x, y) {
        var nodeObj = cc.instantiate(this.nodePrefab);
        nodeObj.name = name;
        nodeObj.parent = this.node;
        nodeObj.position = new cc.Vec2(xPos, yPos);
        var node = nodeObj.getComponent("Node");
        node.x = x;
        node.y = y;
        node.nodeStatus = NodeStatus.OCCUPIED;
        return node;
    },

    //getPathFromPosition:function (startPos, endPos)
    //{
    //    this.getPath(this.getNodeFromPosition(startPos), this.getNodeFromPosition(endPos));
    //},

    getPath: function (startNode, endNode) {
        var closedSet = [];
        var openSet = [];
        openSet.push(startNode);

        while (openSet.length != 0) {
            var currentNode = openSet[0];
            for (var i = 1; i < openSet.length; i++) {
                if (openSet[i].fCost < currentNode.fCost
                    || openSet[i].fCost == currentNode.fCost && openSet[i].hCost < currentNode.hCost) {
                    currentNode = openSet[i];
                }
            }

            openSet.remove(currentNode);
            closedSet.push(currentNode);

            if (currentNode === endNode) {
                var path = [];
                var currNode = endNode;
                while (currNode != startNode) {
                    path.push(currNode);
                    currNode = currNode.parent1;
                }
                path.push(startNode);
                path.reverse();
                return this.optimizePath(path);
            }

            var adjacentNodes = this.getAdjacentMovableNodes(currentNode);
            for (var i = 0; i < adjacentNodes.length; i++) {
                var neighbour = adjacentNodes[i];
                if (closedSet.indexOf(neighbour) != -1) {
                    continue;
                }
                var moveCostToNeighbour = currentNode.gCost + 1;
                if (openSet.indexOf(neighbour) === -1 || moveCostToNeighbour < neighbour.gCost) {
                    neighbour.gCost = moveCostToNeighbour;
                    neighbour.hCost = this.getNodesDistance(neighbour, endNode);
                    neighbour.parent1 = currentNode;

                    if (openSet.indexOf(neighbour) === -1) {
                        openSet.push(neighbour);
                    }
                }
            }
        }
        return null;
    },

    optimizePath: function (path) {
        var optimizedPath = [];
        var curDir = this.getDirectionBetweenNodes(path[0], path[1]);
        for (var i = 0; i < path.length - 1; i++) {
            var nextDir = this.getDirectionBetweenNodes(path[i], path[i + 1]);
            if (!nextDir.equals(curDir))
            {
                optimizedPath.push(path[i]);
                curDir = nextDir;
            }
        }
        optimizedPath.push(path[path.length - 1]);
        return optimizedPath;
    },

    getDirectionBetweenNodes: function (node1, node2) {
        return new cc.Vec2(node2.x - node1.x, node2.y - node1.y).normalize();
    },

    getAdjacentMovableNodes: function (node) {
        var adjacentNodes = [];
        if (this.isValidNodePos(node.x, node.y - 1))
            adjacentNodes.push(this.nodes[node.x][node.y - 1]);

        if (this.isValidNodePos(node.x, node.y + 1))
            adjacentNodes.push(this.nodes[node.x][node.y + 1]);

        if (this.isValidNodePos(node.x + 1, node.y))
            adjacentNodes.push(this.nodes[node.x + 1][node.y]);

        if (this.isValidNodePos(node.x - 1, node.y))
            adjacentNodes.push(this.nodes[node.x - 1][node.y]);

        return adjacentNodes;

    },

    isValidNodePos: function (x, y) {
        if (x >= this.xCount || x < 0 || y >= this.yCount || y < 0)
            return false;
        var node = this.nodes[x][y];
        if (node.nodeStatus === NodeStatus.OCCUPIED)
            return false;

        return true;
    },

    getNodesDistance: function (startNode, endNode) {
        return Math.abs(endNode.x - startNode.x) + Math.abs(endNode.y - startNode.y);
    }

});
