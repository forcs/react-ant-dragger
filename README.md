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
假设存在一个容器组件<code>Container</code>和一个展示组件<code>List</code>，代码如下：
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
        <li key={index}>{item}</li>
      ))
    }
    </ul>
  )
}
```
我们想对<code>List</code>的每个item<code>li</code>实现拖动效果应该怎么做呢？

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
然后，对展示组件<code>List</code>添加如下代码
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
-          <li key={index}>{item}</li>
+          // dragToken is required
+          <Draggable key={index} dragToken={() => item)}>
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

## 处理事件

支持如下事件：
- **onDragStart** 开始拖动时触发
- **onDragEnd** 拖动结束时触发
- **onDragEnter** 拖动元素进入某个目标元素时触发
- **onDragLeave** 拖动元素离开某个目标元素时触发
- **onDragging** 拖动过程中触发
- **onDrop** 松开时触发
- **onDragEdge** 拖动到容器边界时触发 :dizzy:

```js
import React from 'react'
import {
  Dragger,
  Draggable
} from 'react-ant-dragger'

export default class Events extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleDragging = this.handleDragging.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDragEdge = this.handleDragEdge.bind(this)

    this.state = {
      data: [
        'AAAAAAAAAAAAAAAAAAA',
        'BBBBBBBBBBBBBBBBBBB',
        'CCCCCCCCCCCCCCCCCCC',
        'DDDDDDDDDDDDDDDDDDD',
        'EEEEEEEEEEEEEEEEEEE'
      ],
      messages: []
    }
  }

  printMessage (msg) {
    const { messages } = this.state
    const msgs = [ ...messages ]
    msgs.push(msg)
    this.setState({
      ...this.state,
      messages: msgs
    })
  }

  handleDragStart ({source}) {
    this.printMessage(`onDragStart:${source}`)
  }

  handleDragEnter ({source, target}) {
    this.printMessage(
      `onDragEnter:${target} is dragging:${target === source}`)
  }

  handleDragging () {
    console.log('dragging')
  }

  handleDragLeave ({target}) {
    this.printMessage(`onDragLeave:${target}`)
  }

  handleDrop ({source, target}) {
    this.printMessage(`onDrop:${target} ${source}`)
  }

  handleDragEnd ({source, target}) {
    this.printMessage(`onDragEnd:${target} ${source}`)
  }

  handleDragEdge ({ strike }) {
    const {
      left,
      top,
      right,
      bottom
    } = strike
    this.printMessage(`onDragEdge:left ${left} top ${top} right ${right} bottom ${bottom}`)
  }

  render () {
    const { data, messages } = this.state
    return (
      <div className="events">
        <div className="demo">
          <Dragger
            onDragStart={this.handleDragStart}
            onDragEnter={this.handleDragEnter}
            onDragging={this.handleDragging}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
            onDragEnd={this.handleDragEnd}
            onDragEdge={this.handleDragEdge}
          >
            <ul>
            {
              data.map((item, index) => (
                // dragToken property is required
                <Draggable key={index} dragToken={() => item}>
                  <li>{item}</li>
                </Draggable>
              ))
            }
            </ul>
          </Dragger>
          <div
            className="events-console"
            style={{ maxHeight: 300, overflowY: 'scroll' }}
          >
          {
            messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))
          }
          </div>
        </div>
      </div>
    )
  }
}
```

![](http://oz04bqks1.bkt.clouddn.com/18-1-24/3248048.jpg)

## Examples

```shell
git clone https://github.com/forcs/react-ant-dragger.git
cd react-ant-dragger
# npm
npm run examples:install
npm run examples

# yarn
yarn examples:install
yarn examples
```

![](http://oz04bqks1.bkt.clouddn.com/18-1-24/85085342.jpg)

## Links

[React DnD](http://react-dnd.github.io/react-dnd/)
[React](https://reactjs.org/)

## License

MIT