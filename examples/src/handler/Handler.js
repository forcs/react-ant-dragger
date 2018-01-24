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

import './Handler.css'

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
      },
      {
        key: 7,
        title: 'Ant Design Title 7',
      },
      {
        key: 8,
        title: 'Ant Design Title 8',
      },
      {
        key: 9,
        title: 'Ant Design Title 9',
      },
      {
        key: 10,
        title: 'Ant Design Title 10',
      },
      {
        key: 11,
        title: 'Ant Design Title 11',
      }
    ]
  }

  constructor (props) {
    super(props)
    this.handleDropEvent = this.handleDropEvent.bind(this)
    this.computeProps = this.computeProps.bind(this)
  }

  handleDropEvent ({ target, source }) {
    const { data } = this.state
    const targetIndex = data.findIndex(item => item.key === target.key)
    const sourceIndex = data.findIndex(item => item.key === source.key)
    const sourceData = data[sourceIndex]
    const targetData = data[targetIndex]
    this.setState(update(this.state, {
      data: {
        [sourceIndex]: { $set: targetData },
        [targetIndex]: { $set: sourceData }
      }
    }))
  }

  computeProps (props, options) {
    const direction = this.dragDirection(options)
    let {
      className,
      style,
      ...otherProps
    } = props
    style.opacity = '.5'
    if (direction === 'up') {
      className += ' drop-over-upward'
    } else if (direction === 'down') {
      className += ' drop-over-downward'
    }
    return {
      className,
      style,      
      ...otherProps
    }
  }

dragDirection ({ target, source }) {
    if (target.index < source.index) {
      return 'up'
    } else if (target.index > source.index) {
      return 'down'
    }
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
}