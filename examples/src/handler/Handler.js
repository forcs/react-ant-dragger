import React from 'react'
import {
  List,
  Avatar
} from 'antd'
import {
  Dragger,
  Draggable,
  DraggerHandler
} from '../lib/ant-dragger'

import update from 'immutability-helper'
import Syntax from '../lib/components/syntax'
import './Handler.css'

const code = 
`import React from 'react'
import {
  List,
  Avatar
} from 'antd'

import {
  Dragger,
  Draggable,
  DraggerHandler
} from 'react-ant-dragger'

import update from 'immutability-helper'

export default class Handler extends React.Component {

  constructor (props) {
    super(props)
    this.handleDropEvent = this.handleDropEvent.bind(this)
    this.computeProps = this.computeProps.bind(this)
  }

  handleDropEvent ({ target, source }) {
    const { data } = this.state
    const targetIndex = data.findIndex(item => (
      item.key === target.key))
    const sourceIndex = data.findIndex(item => (
      item.key === source.key))
    const sourceData = data[sourceIndex]
    const targetData = data[targetIndex]
    this.setState(update(this.state, {
      data: {
        [sourceIndex]: { $set: targetData },
        [targetIndex]: { $set: sourceData }
      }
    }))
  }

  render () {
    return (
      <Dragger
        onDrop={this.handleDropEvent}
      >
        <div className="handler">
          <List
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={(item, index) => (
              <Draggable 
                dragToken={_ => ({ key: item.key, index})}
                dragCursor="move"
                dragHandlerType="handler"
              >
                <List.Item>
                    <List.Item.Meta
                      avatar={
                        <DraggerHandler>
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                          />
                        </DraggerHandler>
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
              </Draggable>
            )}
          />
        </div>
      </Dragger>
    )
  }

  state = {
    data: [
      {
        key: 1,
        title: 'Ant Design Title 1',
      },
      {
        key: 2,
        title: 'Ant Design Title 2',
      },
      {
        key: 3,
        title: 'Ant Design Title 3',
      },
      {
        key: 4,
        title: 'Ant Design Title 4',
      },
      {
        key: 5,
        title: 'Ant Design Title 5',
      },
      {
        key: 6,
        title: 'Ant Design Title 6',
      }
    ]
  }
}
`

export default class Handler extends React.Component {

  state = {
    data: [
      {
        key: 1,
        title: 'Ant Design Title 1',
      },
      {
        key: 2,
        title: 'Ant Design Title 2',
      },
      {
        key: 3,
        title: 'Ant Design Title 3',
      },
      {
        key: 4,
        title: 'Ant Design Title 4',
      },
      {
        key: 5,
        title: 'Ant Design Title 5',
      },
      {
        key: 6,
        title: 'Ant Design Title 6',
      }
    ]
  }

  constructor (props) {
    super(props)
    this.handleDropEvent = this.handleDropEvent.bind(this)
  }

  handleDropEvent ({ target, source }) {
    const { data } = this.state
    const targetIndex = data.findIndex(
      item => item.key === target.key)
    const sourceIndex = data.findIndex(
      item => item.key === source.key)
    const sourceData = data[sourceIndex]
    const targetData = data[targetIndex]
    this.setState(update(this.state, {
      data: {
        [sourceIndex]: { $set: targetData },
        [targetIndex]: { $set: sourceData }
      }
    }))
  }

  render () {
    return (
      <div className="handler">
        <Dragger
          onDrop={this.handleDropEvent}
        >
          <div className="demo">
            <List
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={(item, index) => (
                <Draggable 
                  dragToken={_ => ({ key: item.key, index})}
                  dragCursor="move"
                  dragHandlerType="handler"
                >
                  <List.Item>
                      <List.Item.Meta
                        avatar={
                          <DraggerHandler>
                            <Avatar
                              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                          </DraggerHandler>
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                  </List.Item>
                </Draggable>
              )}
            />
          </div>
        </Dragger>
        <Syntax>{code}</Syntax>
      </div>
    )
  }
}