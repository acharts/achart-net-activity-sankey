var Util = require('achart-util');
var Base = require('./base.js');

function Net(cfg) {
  Net.superclass.constructor.call(this, cfg);
}

Util.extend(Net,Base);

Util.augment(Net, {
  _layout: function() {
    var _self = this,
        nodeIdToNode = _self.get('nodeIdToNode'),
        edgeIdToEdge = _self.get('edgeIdToEdge'),
        adjoinTable = _self.get('adjoinTable'),
        colArray = [];

    // 初始化列值
    Util.each(nodeIdToNode, function(node, id) {
      node.col = 0;
      colArrayAddNode(node);
    });


    // 计算列
    Util.each(adjoinTable, function(node, id) {
      if (node.start) {
        computeCol(node);
      }
    });


    // 计算行宽度
    Util.each(adjoinTable, function(node, id) {
      if (node.start) {
        computeRowWidth(node);
      }
    });

    // 计算行
    Util.each(colArray, function(col, i) {
      Util.each(col, function(node, j) {
        var row = 0;
        if (col[j - 1]) {
          if (adjoinTable[node.id].next) {
            row += col[j - 1].row + col[j - 1].rowWidth;
          } else {
            row += col[j - 1].row + 1;
          }
        } else {
          row = 1;
        }
        if (node.rawWidthTag) {
          var pre = nodeIdToNode[node.rawWidthTag];
          if (row < pre.row) {
            node.row = pre.row;
          } else {
            node.row = row;
          }
          return true;
        }
        node.row = row;
      });
    });


    function colArrayAddNode(node) {
      if (!colArray[node.col]) {
        colArray[node.col] = [];
      }
      colArray[node.col].push(node);
    }

    function colArrayDelNode(node) {
      var array = colArray[node.col];
      var index = -1;
      Util.each(array, function(innerNode, innerIndex) {
        if (innerNode === node) {
          index = innerIndex;
          return false;
        }
      });
      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    function computeRowWidth(node, tag) {
      if (nodeIdToNode[node.val].rawWidthTag) {
        return 0;
      }
      nodeIdToNode[node.val].rawWidthTag = tag;
      if (unSubNode(node)) {
        return (nodeIdToNode[node.val].rowWidth = 1);
      }
      var width = 0;
      var tmp = node;
      while(tmp.next) {
        tmp = tmp.next;
        width += computeRowWidth(adjoinTable[tmp.val], node.val);
      }
      return (nodeIdToNode[node.val].rowWidth = width);
    }

    function unSubNode(node) {
      while(node.next) {
        node = node.next;
        if (nodeIdToNode[node.val].rawWidthTag) {
          continue;
        }
        return false;
      }
      return true;
    }

    function computeCol(node) {
      var queue = [];
      var colTag = node.val;
      queue.push(node);
      while(queue.length !== 0) {
        var node = queue.shift();
        if (node.colTag === colTag) {
          continue;
        }
        if (node.start) {
          node.colTag = colTag;
          colArrayDelNode(nodeIdToNode[node.val]);
          nodeIdToNode[node.val].col = 1;
          colArrayAddNode(nodeIdToNode[node.val]);
        } else {
          if (nodeIdToNode[node.val].col <= nodeIdToNode[node.pre].col) {
            node.colTag = colTag;
            colArrayDelNode(nodeIdToNode[node.val]);
            nodeIdToNode[node.val].col = nodeIdToNode[node.pre].col + 1;
            colArrayAddNode(nodeIdToNode[node.val]);
          }
        }
        var tmp = adjoinTable[node.val].next;
        while(tmp) {
          queue.push(tmp);
          tmp = tmp.next;
        }
      }
    }
  }
});

module.exports = Net;
