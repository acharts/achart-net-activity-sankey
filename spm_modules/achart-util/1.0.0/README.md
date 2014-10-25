# achart-util [![spm version](http://spmjs.io/badge/achart-util)](http://spmjs.io/package/achart-util)

---

图表的工具类

---

## Install

```
$ spm install achart-util --save
```

## Usage

```js
var Util = require('achart-util');

```


## 工具方法

### DOM相关方法

  * createDom(str) 创建DOM
  * contains(node,subNode) 是否包含节点
  * getWidth(el) 元素宽度
  * getHeight(el) 元素高度
  * getOuterWidth(el) 元素外层宽度
  * getOuterHeight(el) 元素外层高度
  * getStyle(el,name) 获取css属性
  * addEvent(el,type,fn) 添加事件
  * removeEvent(el,type,fn) 移除事件

### 类型判断

  * isObject
  * isNumber
  * isNumeric 是否是数字或者数字字符串
  * isBoolean
  * isFunction
  * isArray
  * isDate

### 继承相关
  
  * mix(target,source1,source2....sourcen) 合并
  * mix(true,target,source1,source2....sourcen) 深层合并
  * augment(target,source1,source2...sourcen) 将属性方法复制到target的原型链上
  * extend(subclass,superclass,overrides, staticOverrides) 继承
  * mixin(target,mixins) 将数组中的代码片段的属性和方法复制到target的原型链上

### 数组相关

  * toArray(value) 转换成数组
  * map(arr,fn) 转换数组
  * filter(arr,fn) 过滤数组
  * each(arr,fn) 遍历数组
  * indexOf(arr,obj) 索引
  * remove(arr,obj) 删除
  * empty() 清空
  * equalsArray(arr1,arr2) 数组内容是否相等

### 动画相关

  * animStep(duration,fn,callback) 分步执行动画
  * animPath()
  * stopStep(handler) 终止animStep返回的句柄

### path 工具类

  * getPointAtLength(path, length) 获取路径上的点
  * isPointInsidePath(path,x,y) 点是否在path内部
  * getSubpath(path, from, to) 获取子路径
  * parsePathString(str) 将字符串的path 转换成数组
  * parsePathArray(arr) 将数组转换成字符串
  * transformPath(path,transform) 给path 添加变换

### 颜色相关

  * highlight(c,percent) 增加亮度
  * dark(c,percent) 变暗

### Snap

  * snapTo(values, value, tolerance) 逼近最近的一个数字
  * snapFloor(values,value) 逼近比较小的
  * snapCeiling(values,value) 逼近较大的值

### 其他

  * guid(prefix) 获取对应前缀的GUID
  * wrapBehavior(obj,action) 将事件绑定到对象的方法上
  * getWrapBehavior(obj,action) 获取绑定的事件
  * tryFixed(value,base) 将value的小数位数跟base一致
  * requestAnimationFrame(fn) 按帧执行动画
  * cancelAnimationFrame(fn) 取消帧动画执行



  


