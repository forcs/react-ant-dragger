import React from 'react'
import ReactDOM from 'react-dom'
import {
  Table
} from 'antd'
import update from 'immutability-helper'
import {
  Dragger,
  Draggable
} from '../lib/ant-dragger'
import throttle from 'lodash/throttle'
import { tween } from 'popmotion'
import scroll from 'stylefire/scroll'

import Syntax from '../lib/components/syntax'

class BodyRow extends React.Component {

  render () {
    const {
      token,
      ...otherProps
    } = this.props
    return (
      <Draggable 
        dragCursor="pointer" 
        dragToken={() => token}
      >
        <tr {...otherProps} />
      </Draggable>
    )
  }
}

const columns = [{
  title: 'ID',
  dataIndex: 'key',
  key: 'key',
}, {
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}]

const code = 
`import React from 'react'
import ReactDOM from 'react-dom'
import {
  Table
} from 'antd'
import update from 'immutability-helper'
import {
  Dragger,
  Draggable
} from 'react-ant-dragger'
import throttle from 'lodash/throttle'
import { tween } from 'popmotion'
import scroll from 'stylefire/scroll'

class BodyRow extends React.Component {

  render () {
    const {
      token,
      ...otherProps
    } = this.props
    return (
      <Draggable 
        dragCursor="pointer" 
        dragToken={() => token}
      >
        <tr {...otherProps} />
      </Draggable>
    )
  }
}

const columns = [{
  title: 'ID',
  dataIndex: 'key',
  key: 'key',
}, {
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}]

export default class Edge extends React.Component {

  components = {
    body: {
      row: BodyRow
    }
  }

  constructor (props) {
    super(props)
    this.exchangeRow = this.exchangeRow.bind(this)
    this.handleDragEdge = throttle(this.handleDragEdge.bind(this), 500)
  }

  componentDidMount () {
    const selfDOM = ReactDOM.findDOMNode(this)
    this.tableBody = selfDOM.querySelector('.ant-table-body')
    this.tableBodyInner = selfDOM.querySelector('.ant-table-tbody')
    this.tableBodyScroller = scroll(this.tableBody)
  }

  handleDragEdge ({ strike }) {
    const currScrollTop = this.tableBodyScroller.get('top')
    const maxScroll = 
      this.tableBodyInner.clientHeight - this.tableBody.clientHeight
    if (strike.top && currScrollTop > 0) {
      tween({
        from: currScrollTop,
        to: Math.max(0, currScrollTop - 80),
        duration: 300
      }).start(v => this.tableBodyScroller.set('top', v))
    } else if (strike.bottom && currScrollTop < maxScroll) {
      tween({
        from: currScrollTop,
        to: Math.min(maxScroll, currScrollTop + 80),
        duration: 300
      }).start(v => this.tableBodyScroller.set('top', v))
    }
  }

  exchangeRow ({ target, source }) {
    const { data } = this.state
    const sourceIndex = data.findIndex(item => item.key === source)
    const targetIndex = data.findIndex(item => item.key === target)
    const sourceData = data[sourceIndex]
    this.setState(update(this.state, {
      data: {
        $splice: [
          [ sourceIndex, 1], [ targetIndex, 0, sourceData ]
        ]
      }
    }))
  }

  render () {
    return (
      <div className="edge">
        <Dragger
          onDrop={this.exchangeRow}
          onDragEdge={this.handleDragEdge}
        >
          <div className="table-dnd-main">
            <Table
              pagination={{ pageSize: 40 }}
              scroll={{ y: 500 }}
              dataSource={this.state.data}
              components={this.components}
              columns={columns}
              onRow={(record, index) => ({ token: record.key })}
            />
          </div>
        </Dragger>
      </div>
    )
  }

  state = {
    data: [
      {
        key: 1, 
        name: 'John Brown', 
        age: 32, 
        address: 'New York No. 1 Lake Park' 
      },
      { 
        key: 2, 
        name: 'Jim Green', 
        age: 42, 
        address: 'London No. 1 Lake Park' 
      },
      { 
        key: 3, 
        name: 'Joe Black', 
        age: 32, 
        address: 'Sidney No. 1 Lake Park' 
      },
      { 
        key: 4, 
        name: 'Forcs Zhange', 
        age: 38, 
        address: 'Sidney No. 2 Lake Park' 
      },
      { 
        key: 5, 
        name: 'Eva Gu', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 6, 
        name: 'Eva Gu1', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 7, 
        name: 'Eva Gu2', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 8, 
        name: 'Eva Gu3', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 9, 
        name: 'Eva Gu4', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 10, 
        name: 'Eva Gu5', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 11, 
        name: 'Eva Gu6', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 12, 
        name: 'Eva Gu7', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 13, 
        name: 'Eva Gu8', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 14, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 15, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 16, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 17, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 18, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 19, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 20, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 21, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 22, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 23, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 24, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 25, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 26, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 27, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      }
    ]
  }
}
`

export default class Edge extends React.Component {

  components = {
    body: {
      row: BodyRow
    }
  }

  state = {
    data: [
      {
        key: 1, 
        name: 'John Brown', 
        age: 32, 
        address: 'New York No. 1 Lake Park' 
      },
      { 
        key: 2, 
        name: 'Jim Green', 
        age: 42, 
        address: 'London No. 1 Lake Park' 
      },
      { 
        key: 3, 
        name: 'Joe Black', 
        age: 32, 
        address: 'Sidney No. 1 Lake Park' 
      },
      { 
        key: 4, 
        name: 'Forcs Zhange', 
        age: 38, 
        address: 'Sidney No. 2 Lake Park' 
      },
      { 
        key: 5, 
        name: 'Eva Gu', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 6, 
        name: 'Eva Gu1', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 7, 
        name: 'Eva Gu2', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 8, 
        name: 'Eva Gu3', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 9, 
        name: 'Eva Gu4', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 10, 
        name: 'Eva Gu5', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 11, 
        name: 'Eva Gu6', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 12, 
        name: 'Eva Gu7', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 13, 
        name: 'Eva Gu8', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 14, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 15, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 16, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 17, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 18, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 19, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 20, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 21, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 22, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 23, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 24, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 25, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 26, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      },
      { 
        key: 27, 
        name: 'Eva Gu9', 
        age: 33, 
        address: 'Sidney No. 3 Lake Park' 
      }
    ]
  }

  constructor (props) {
    super(props)
    this.exchangeRow = this.exchangeRow.bind(this)
    this.handleDragEdge = throttle(this.handleDragEdge.bind(this), 500)
  }

  componentDidMount () {
    const selfDOM = ReactDOM.findDOMNode(this)
    this.tableBody = selfDOM.querySelector('div.ant-table-body')
    this.tableBodyInner = selfDOM.querySelector('tbody.ant-table-tbody')
    this.tableBodyScroller = scroll(this.tableBody)
  }

  handleDragEdge ({ strike }) {
    const currScrollTop = this.tableBodyScroller.get('top')
    const maxScroll = this.tableBodyInner.clientHeight - this.tableBody.clientHeight
    if (strike.top && currScrollTop > 0) {
      tween({
        from: currScrollTop,
        to: Math.max(0, currScrollTop - 80),
        duration: 300
      }).start(v => this.tableBodyScroller.set('top', v))
    } else if (strike.bottom && currScrollTop < maxScroll) {
      tween({
        from: currScrollTop,
        to: Math.min(maxScroll, currScrollTop + 80),
        duration: 300
      }).start(v => this.tableBodyScroller.set('top', v))
    }
  }

  exchangeRow ({ target, source }) {
    const { data } = this.state
    const sourceIndex = data.findIndex(item => item.key === source)
    const targetIndex = data.findIndex(item => item.key === target)
    const sourceData = data[sourceIndex]
    this.setState(update(this.state, {
      data: {
        $splice: [
          [ sourceIndex, 1], [ targetIndex, 0, sourceData ]
        ]
      }
    }))
  }

  render () {
    return (
      <div className="edge">
        <div className="demo">
          <Dragger
            onDrop={this.exchangeRow}
            onDragEdge={this.handleDragEdge}
          >
            <div className="table-dnd-main">
              <Table
                pagination={{ pageSize: 40 }}
                scroll={{ y: 500 }}
                dataSource={this.state.data}
                components={this.components}
                columns={columns}
                onRow={(record, index) => ({ token: record.key })}
              />
            </div>
          </Dragger>
        </div>
        <Syntax>{code}</Syntax>
      </div>
    )
  }
}