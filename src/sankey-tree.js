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
    var self = this;
    var id = self.get('id');
    if (id == null) {
      throw '需要画板id';
    }
    var canvas = new Canvas({id: id});
    if (!canvas) {
      throw "画板初始化失败";
    }
    self.set('canvas', canvas);
  },
  _layout: function() {
    var self = this;
    prototypeLayout.call(self);
    var nodeIdToNode = self.get('nodeIdToNode'),
        edgeIdToEdge = self.get('edgeIdToEdge'),
        adjoinTable = self.get('adjoinTable'),
        inverseAdjoinTable = self.get('inverseAdjoinTable');

    console.log(inverseAdjoinTable);
    Util.each(adjoinTable, function(node, index) {
      if (node.start) {
        if (!nodeIdToNode[node.val].quantity) {
          nodeIdToNode[node.val].quantity = 0;
        }
      }
    });


  },
  drawNode: function(node) {
    var self = this,
        canvas = self.get('canvas'),
        spanWidth = self.get('spanWidth'),
        spanHeight = self.get('spanHeight'),
        nodeRadius = self.get('nodeRadius'),
        halfWidth = spanWidth / 2,
        halfHeight = spanHeight / 2;
    var x = node.col * spanHeight - halfHeight,
        y = (node.row + node.rowWidth / 2) * spanWidth - halfWidth;

    canvas.addShape({
      type: 'circle',
      attrs: {
        cx: x,
        cy: y,
        r: nodeRadius,
        stroke: 'red'
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
  },
  drawEdge: function(edge) {
    var self = this,
        canvas = self.get('canvas'),
        spanWidth = self.get('spanWidth'),
        spanHeight = self.get('spanHeight'),
        nodeRadius = self.get('nodeRadius'),
        halfWidth = spanWidth / 2,
        halfHeight = spanHeight / 2;
    var x1 = edge.sourceNode.col * spanHeight - halfHeight;
    var y1 = (edge.sourceNode.row + edge.sourceNode.rowWidth / 2) * spanWidth - halfWidth;

    var x2 = edge.targetNode.col * spanHeight - halfHeight;
    var y2 = (edge.targetNode.row + edge.targetNode.rowWidth / 2) * spanWidth - halfWidth;


    var theta;
    var xspan = x2 - x1;
    var yspan = y2 - y1;
    if (xspan > 0.0001) {
      theta = Math.atan(yspan/xspan);
    } else {
      theta = yspan > 0 ? Math.PI / 2 : -Math.PI / 2;
    }

    canvas.addShape({
      type: 'path',
      attrs: {
        path: 'M' + (x1 + nodeRadius) + ' ' + y1 + ' C' + (x2 - nodeRadius) + ' ' + y1 + ' ' + (x1 + nodeRadius) + ' ' + y2 + ' ' + (x2 - nodeRadius) + ' ' + y2,
        'arrow-end':'none-midium-midium',
        stroke: 'green',
        'stroke-width': 1,
        'stroke-opacity': 0.7
      }
    });
  }
});



module.exports = SankeyTree;
