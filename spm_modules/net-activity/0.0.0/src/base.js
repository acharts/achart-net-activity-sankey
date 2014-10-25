var Util = require('achart-util');

function Activity(cfg) {
  this._attrs = Util.mix({}, Activity.ATTRS, cfg);
  this.events = {};
}

var infix = '__->__';

Activity.ATTRS = {
  /**
   * 显示的节点
   */
  nodes: [],
  /**
   * 显示的有向边
   */
  edges: []
};

Util.augment(Activity, {
  init: function() {},
  get : function(name){
    return this._attrs[name];
  },
  set : function(name,value){
    this._attrs[name] = value;
    return this;
  },
  render: function() {
    var _self = this;
    _self.init();
    _self._initStructure();
    _self._layout();
    _self._renderData();
  },
  _initStructure: function() {
    var _self = this,
        nodes = _self.get('nodes'),
        edges = _self.get('edges');
    var nodeIdToNode = {};
    var adjoinTable = {};
    var inverseAdjoinTable = {};
    Util.each(nodes, function(node) {
      nodeIdToNode[node.id] = node;
      adjoinTable[node.id] = {val: node.id, start: true};
      inverseAdjoinTable[node.id] = {val: node.id};
    });
    _self.set('nodeIdToNode', nodeIdToNode);

    var edgeIdToEdge = {};
    Util.each(edges, function(edge) {
      var id = edge.source + infix + edge.target;
      edgeIdToEdge[id] = edge;
      edge.sourceNode = nodeIdToNode[edge.source];
      edge.targetNode = nodeIdToNode[edge.target];
      var node = getLast(adjoinTable[edge.source]);
      node.next = {val: edge.target, pre: edge.source};
      adjoinTable[edge.target].start = false;
      node = getLast(inverseAdjoinTable[edge.target]);
      node.next = {val: edge.source, suc: edge.target};
    });
    _self.set('edgeIdToEdge', edgeIdToEdge);
    _self.set('adjoinTable', adjoinTable);
    _self.set('inverseAdjoinTable', inverseAdjoinTable);
  },
  _renderData: function() {
    var _self = this,
        nodeIdToNode = _self.get('nodeIdToNode'),
        edgeIdToEdge = _self.get('edgeIdToEdge');
    Util.each(nodeIdToNode, function(node) {
      _self.drawNode(node);
    });

    Util.each(edgeIdToEdge, function(edge) {
      _self.drawEdge(edge);
    });
  },
  _layout: function() {
    console.warn('请重载布局方法 _layout');
  },
  drawNode: function() {
    console.warn('请重载节点画法 drawNode');
  },
  drawEdge: function() {
    console.warn('请重载边画法 drawEdge')
  },
  findEdge: function(source, target) {
    var _self = this;
        edgeIdToEdge = _self.get('edgeIdToEdge');
    return edgeIdToEdge[source + infix + target];
  }
});

function getLast(node) {
  while(node.next) {
    node = node.next;
  }
  return node;
}


module.exports = Activity;
