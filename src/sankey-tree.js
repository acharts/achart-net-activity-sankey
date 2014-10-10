var Tree = require('net-activity').Tree;
var Util = require('achart-util');
var Canvas = require('achart-canvas')
var prototypeLayout = Tree.prototype._layout;

function SankeyTree(cfg) {
  SankeyTree.superclass.constructor.call(this, cfg);
}

Util.extend(SankeyTree, Tree);

Util.augment(SankeyTree, {
  init: function() {
    var _self = this;
    var id = _self.get('id');
    if (id == null) {
      throw '需要画板id';
    }
    var canvas = new Canvas({id: id});
    if (!canvas) {
      throw "画板初始化失败";
    }
    _self.set('canvas', canvas);
  },
  _layout: function() {
    var _self = this;
    prototypeLayout.call(_self);
    var nodeIdToNode = _self.get('nodeIdToNode'),
        edgeIdToEdge = _self.get('edgeIdToEdge'),
        adjoinTable = _self.get('adjoinTable'),
        inverseAdjoinTable = _self.get('inverseAdjoinTable');


    computeQuantity();

    // 计算流量
    function computeQuantity() {
      var queue = [];
      Util.each(adjoinTable, function(node, index) {
        if (node.start) {
          if (!nodeIdToNode[node.val].quantity) {
            nodeIdToNode[node.val].quantity = 0;
          }
          queue.push(node);
        } else {
          nodeIdToNode[node.val].quantity = 0;
        }
        nodeIdToNode[node.val]._frontEdgeStart = 0;
        nodeIdToNode[node.val]._backEdgeStart = 0;
      });

      while(queue.length !== 0) {
        var node = queue.shift();
        var visiteTag = node.val;
        while(node.next) {
          node = node.next;

          var edge = _self.findEdge(node.pre, node.val);
          var rate = edge.rate;
          var quantity = nodeIdToNode[node.pre].quantity;
          edge.quantity = quantity * rate;
          if (node.visiteTag === visiteTag) {
            nodeIdToNode[node.val].quantity = edge.quantity;
          } else {
            nodeIdToNode[node.val].quantity += edge.quantity;
          }
          queue.push(adjoinTable[node.val]);
          node.visiteTag = visiteTag;
        }

      }
    }
  },
  drawNode: function(node) {
    var _self = this,
        canvas = _self.get('canvas'),
        spanWidth = _self.get('spanWidth'),
        spanHeight = _self.get('spanHeight'),
        halfWidth = spanWidth / 2,
        halfHeight = spanHeight / 2,
        rectWidth = _self.get('rectWidth'),
        halfRectWidth = rectWidth / 2,
        rectHeight = node.quantity,
        halfRectHeight = rectHeight / 2,
        drect = _self.get('drect');
    var x = node.col * spanWidth - halfWidth - halfRectWidth,
        y = (node.row + node.rowWidth / 2) * spanHeight - halfHeight - halfRectHeight;


    if (drect === 'vertical') {
      canvas.addShape({
        type: 'rect',
        attrs: {
          x: y,
          y: x,
          width: node.quantity,
          height: rectWidth,
          stroke: 'red',
          fill: node.fill
        }
      });
      canvas.addShape({
        type: 'text',
        attrs: {
          x: y - 15,
          y: x,
          text: node.id
        }
      });
    } else {
      canvas.addShape({
        type: 'rect',
        attrs: {
          x: x,
          y: y,
          width: rectWidth,
          height: node.quantity,
          stroke: 'red',
          fill: node.fill
        }
      });
      canvas.addShape({
        type: 'text',
        attrs: {
          x: x,
          y: y - 15,
          text: node.id
        }
      });
    }
  },
  drawEdge: function(edge) {
    var _self = this,
        canvas = _self.get('canvas'),
        spanWidth = _self.get('spanWidth'),
        spanHeight = _self.get('spanHeight'),
        halfWidth = spanWidth / 2,
        halfHeight = spanHeight / 2,
        rectWidth = _self.get('rectWidth'),
        halfRectWidth = rectWidth / 2,
        drect = _self.get('drect');
    var sourceNode = edge.sourceNode;
    var sourceRectHeight = sourceNode.quantity;
    var x1 = sourceNode.col * spanWidth - halfWidth;
    var y1 = (sourceNode.row + sourceNode.rowWidth / 2) * spanHeight - halfHeight - sourceRectHeight / 2 + (edge.quantity / 2 + sourceNode._backEdgeStart);
    sourceNode._backEdgeStart += edge.quantity;

    var targetNode = edge.targetNode;
    var targetRectHeight = targetNode.quantity;
    var x2 = targetNode.col * spanWidth - halfWidth;
    var y2 = (targetNode.row + targetNode.rowWidth / 2) * spanHeight - halfHeight - targetRectHeight / 2 + (edge.quantity / 2 + targetNode._frontEdgeStart);
    targetNode._frontEdgeStart += edge.quantity;

    if(drect === 'vertical') {
      canvas.addShape({
        type: 'path',
        attrs: {
          path: 'M' + y1 + ' ' + (x1 + halfRectWidth) + ' C' + y1 + ' ' + (x2 - halfRectWidth - halfWidth) + ' ' + y2 + ' ' + (x1 + halfRectWidth + halfWidth) + ' ' + y2 + ' ' + (x2 - halfRectWidth),
          'arrow-end':'none-midium-midium',
          stroke: edge.color,
          'stroke-width': edge.quantity,
          'stroke-opacity': 0.7
        }
      });
    } else {
      canvas.addShape({
        type: 'path',
        attrs: {
          path: 'M' + (x1 + halfRectWidth) + ' ' + y1 + ' C' + (x2 - halfRectWidth - halfWidth) + ' ' + y1 + ' ' + (x1 + halfRectWidth + halfWidth) + ' ' + y2 + ' ' + (x2 - halfRectWidth) + ' ' + y2,
          'arrow-end':'none-midium-midium',
          stroke: edge.color,
          'stroke-width': edge.quantity,
          'stroke-opacity': 0.7
        }
      });
    }


  }
});



module.exports = SankeyTree;
