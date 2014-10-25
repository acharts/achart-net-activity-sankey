var Util = require('achart-util');
var Base = require('./base.js');

function Tree(cfg) {
  Tree.superclass.constructor.call(this, cfg);
}

Util.extend(Tree,Base);

Util.augment(Tree, {
  _layout: function() {
    var _self = this,
        nodeIdToNode = _self.get('nodeIdToNode'),
        edgeIdToEdge = _self.get('edgeIdToEdge'),
        adjoinTable = _self.get('adjoinTable');

    // 初始化根节点
    var root = {val: '__root__', children: [], parent: null, rowStart: 1};
    Util.each(adjoinTable, function(node, id) {
      if (node.start) {
        nodeIdToNode[node.val].__buildTree = true;
        root.children.push({val: node.val, parent: root, children: [], rowStart: 1});
      }
    });

    // 建造生成树
    buildTree();

    // 计算列宽
    computeRowWidth(root);

    // 计算列和行
    computeColAndRow(root);


    function computeRowWidth(root){
      if (root.children.length === 0) {
        root.isFeaf = true;
        return (nodeIdToNode[root.val].rowWidth = 1);
      }
      var width = 0;
      for (var i = 0, l = root.children.length; i < l; i ++) {
        width += computeRowWidth(root.children[i]);
      }
      if (root.parent) {
        return (nodeIdToNode[root.val].rowWidth = width);
      }
    }

    function computeColAndRow(root) {
      if (!root.parent) {
        root.col = 0;
      } else {
        root.col = root.parent.col + 1;
        nodeIdToNode[root.val].col = root.col;
        nodeIdToNode[root.val].row = root.parent.rowStart;
        root.parent.rowStart += nodeIdToNode[root.val].rowWidth;
        root.rowStart = nodeIdToNode[root.val].row;
      }
      for (var i = 0, l = root.children.length; i < l; i ++) {
        computeColAndRow(root.children[i]);
      }
    }

    function buildTree() {
      var queue = [];
      [].push.apply(queue, root.children);
      while(queue.length !== 0) {
        var parent = queue.shift();
        var node = adjoinTable[parent.val];
        while(node.next) {
          node = node.next;
          if (nodeIdToNode[node.val].__buildTree) {
            continue;
          } else {
            nodeIdToNode[node.val].__buildTree = true;
            parent.children.push({val: node.val, parent: parent, children: [], rowStart: 1});
          }
        }
        [].push.apply(queue, parent.children);
      }
    }
  }
});





module.exports = Tree;
