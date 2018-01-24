# React Ant Dragger
![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/dependencies-react--dnd-brightgreen.svg)

一个基于React DnD封装的drag-and-drop组件

## 安装

```shell
# npm
npm i react-ant-dragger -S
# yarn
yarn add react-ant-dragger
```

## 使用
假设存在一个容器组件<code><Container /></code>和一个展示组件<code><List /></code>，代码如下：
```js
//Container.js
import React from 'react'
import List from './List.js'

class Container extends React.Component {
  // .......

  render () {
    return (
      <List />
    )
  }
}

export Container
```
```js
// List.js
import React from 'react'

export default () => {

  const list = [
    'AAAAAAAAAAAAAAAAAAA',
    'BBBBBBBBBBBBBBBBBBB',
    'CCCCCCCCCCCCCCCCCCC',
    'DDDDDDDDDDDDDDDDDDD',
    'EEEEEEEEEEEEEEEEEEE'
  ]

  return (
    <ul>
    {
      list.map((item, index) => (
        // dragToken is required
        <li key={index}>{item}</li>
      ))
    }
    </ul>
  )
}
```
我们想对<code><List /></code>的每个item<code><li /></code>实现拖动效果应该怎么做呢？

首先，容器组件用`DraggerContext`进行包装，例如：
```diff
//Container.js
import React from 'react'
+import {
+  DraggerContext
+} from 'react-ant-dragger'

import List from './List.js'

class Container extends React.Component {
  // .......

  render () {
    return (
      <List />
    )
  }
}

- export default Container
+ export default DraggerContext(Container)
```
然后，对展示组件<code><List /></code>添加如下代码
```diff
// List.js
import React from 'react'
+import {
+  Dragger,
+  Draggable
+} from 'react-ant-dragger'

export default () => {

  const list = [
    'AAAAAAAAAAAAAAAAAAA',
    'BBBBBBBBBBBBBBBBBBB',
    'CCCCCCCCCCCCCCCCCCC',
    'DDDDDDDDDDDDDDDDDDD',
    'EEEEEEEEEEEEEEEEEEE'
  ]

  return (
+    <Dragger>
      <ul>
      {
        list.map((item, index) => (
          // dragToken is required
-          <li key={index}>{item}</li>
+          <Draggable key={index} dragToken={() => (index + 1)}>
+            <li>{item}</li>
+          </Draggable>
        ))
      }
      </ul>
+    </Dragger>
  )
}
```
DONE！:tada::tada::tada:
![](http://oz04bqks1.bkt.clouddn.com/18-1-24/90006750.jpg)