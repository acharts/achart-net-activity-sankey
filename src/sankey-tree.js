var Tree = require('net-activity').Net;
var Util = require('achart-util');
var Canvas = require('achart-canvas')
var prototypeLayout = Tree.prototype._layout;

function SankeyTree(cfg) {
  cfg = Util.mix({}, SankeyTree.ATTRS, cfg);
  SankeyTree.superclass.constructor.call(this, cfg);
}

SankeyTree.ATTRS = {
  spanWidth: 150,
  spanHeight: 100,
  rectWidth: 20,
  lineOpacity: 0.5,
  hoverOpacity: 0.7,
  canDrag: true,
  direct: 'horizontal'
};

Util.extend(SankeyTree, Tree);

Util.augment(SankeyTree, {
  //初始化
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
    _self._eventListen();
  },
  // 绑定事件
  _eventListen: function() {
    var _self = this;
    var canvas = _self.get('canvas');
    var lineOpacity = _self.get('lineOpacity');
    var hoverOpacity = _self.get('hoverOpacity');
    canvas.on('mouseover', function(e) {
      var shape = e.target.shape;
      if (shape) {
        if (shape.get('type') === 'path') {
          shape.attr('stroke-opacity', hoverOpacity);
        }
        shape.attr('cursor', 'pointer');

      }
    });
    canvas.on('mouseout', function(e) {
      var shape = e.target.shape;
      if (shape) {
        if (shape.get('type') === 'path') {
          shape.attr('stroke-opacity', lineOpacity);
        }
      }
    });
  },
  // 布局
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
      // 初始化
      Util.each(adjoinTable, function(node, index) {
        if (node.start) {
          if (!nodeIdToNode[node.val].quantity) {
            nodeIdToNode[node.val].quantity = 0;
          }
          queue.push(node);
        } else {
          nodeIdToNode[node.val].quantity = 0;
          nodeIdToNode[node.val].subQuantitys = {};
        }
        nodeIdToNode[node.val]._frontEdgeStart = 0;
        nodeIdToNode[node.val]._backEdgeStart = 0;
      });


      while(queue.length !== 0) {
        var node = queue.shift();
        while(node.next) {
          node = node.next;
          var edge = _self.findEdge(node.pre, node.val);
          var rate = edge.rate;
          var quantity = nodeIdToNode[node.pre].quantity;
          edge.quantity = quantity * rate;
          nodeIdToNode[node.val].subQuantitys[node.pre] = edge.quantity;
          nodeIdToNode[node.val].quantity = 0;
          Util.each(nodeIdToNode[node.val].subQuantitys, function(qua) {
            nodeIdToNode[node.val].quantity += qua;
          });
          queue.push(adjoinTable[node.val]);
        }
      }
    }// computeQuantity end

  },
  //画节点
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

        direct = _self.get('direct'),
        canDrag = _self.get('canDrag');
        node.lines = [];
    var x = (node.col - 1 / 2) * spanWidth - halfRectWidth,
        y = (node.row + node.rowWidth / 2 - 1 / 2) * spanHeight - halfRectHeight;

    var rect = canvas.addShape({
          type: 'rect',
          zIndex: 1,
          attrs: {
            stroke: 'red',
            fill: node.fill
          }
        });
    var text = canvas.addShape({
          type: 'text',
          attrs: {
            text: node.id
          }
        });
    node.rect = rect;
    node.text = text;
    node.x = x;
    node.y = y;
    node.rectWidth = rectWidth;

    if (canDrag) {
      //拖动
      var old = 0;
      rect.drag(function(x, y) {
        var span = y;
        if (direct === 'vertical') {
          span = x;
        }
        var newVal = old + span;
        node.y = newVal;
        _self._dragNode(node, direct);
        Util.each(node.lines, function(line) {
          _self._dragLine(line, direct);
        });
      }, function() {
        old = node.y;
      });
    }


    _self._dragNode(node, direct);
  },
  // 画出节点
  _dragNode: function(node, direct) {
    if (direct === 'vertical') {
      node.rect.attr({
        x: node.y,
        y: node.x,
        width: node.quantity,
        height: node.rectWidth
      });

      node.text.attr({
        x: node.y + node.quantity + 15,
        y: node.x
      });
    } else {
      node.rect.attr({
        x: node.x,
        y: node.y,
        width: node.rectWidth,
        height: node.quantity
      });
      node.text.attr({
        x: node.x,
        y: node.y - 15
      });
    }
  },
  // 画边
  drawEdge: function(edge) {
    var _self = this,
        canvas = _self.get('canvas'),

        spanWidth = _self.get('spanWidth'),
        spanHeight = _self.get('spanHeight'),
        halfWidth = spanWidth / 2,
        halfHeight = spanHeight / 2,

        rectWidth = _self.get('rectWidth'),
        direct = _self.get('direct');
    var lineOpacity = _self.get('lineOpacity');
    var sourceNode = edge.sourceNode;
    var sourceRectHeight = sourceNode.quantity;
    var x1 = rectWidth;
    var y1 = edge.quantity / 2 + sourceNode._backEdgeStart;
    sourceNode._backEdgeStart += edge.quantity;

    var targetNode = edge.targetNode;
    var targetRectHeight = targetNode.quantity;
    var x2 = 0;
    var y2 = edge.quantity / 2 + targetNode._frontEdgeStart;
    targetNode._frontEdgeStart += edge.quantity;


    var line = canvas.addShape({
      type: 'path',
      attrs: {
        'arrow-end':'none-midium-midium',
        stroke: edge.color,
        'stroke-width': edge.quantity,
        'stroke-opacity': lineOpacity
      }
    });

    line.x1 = x1;
    line.y1 = y1;
    line.sourceRect = sourceNode.rect;
    line.x2 = x2;
    line.y2 = y2;
    line.targetRect = targetNode.rect;
    line.halfWidth = halfWidth;

    sourceNode.lines.push(line);

    targetNode.lines.push(line);

    _self._dragLine(line, direct);

  },
  //画线
  _dragLine: function(line, direct) {
    if (direct === 'vertical') {
      var sourceX = line.sourceRect.attr('y');
      var sourceY = line.sourceRect.attr('x');
      var x1 = sourceX + line.x1;
      var y1 = sourceY + line.y1;
      var targetX = line.targetRect.attr('y');
      var targetY = line.targetRect.attr('x');
      var x2 = targetX + line.x2;
      var y2 = targetY + line.y2;
      var halfWidth = line.halfWidth;
      line.attr('path', [
          ['M', y1, x1],
          ['C',
                y1, x2 - halfWidth,
                y2, x1 + halfWidth,
                y2, x2
          ]
      ]);
    } else {
      var sourceX = line.sourceRect.attr('x');
      var sourceY = line.sourceRect.attr('y');
      var x1 = sourceX + line.x1;
      var y1 = sourceY + line.y1;
      var targetX = line.targetRect.attr('x');
      var targetY = line.targetRect.attr('y');
      var x2 = targetX + line.x2;
      var y2 = targetY + line.y2;
      var halfWidth = line.halfWidth;
      line.attr('path', [
          ['M', x1, y1],
          ['C',
                x2 - halfWidth, y1,
                x1 + halfWidth, y2,
                x2, y2
          ]
      ]);
    }
  }
});



module.exports = SankeyTree;
