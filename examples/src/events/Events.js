import React from 'react'
import {
  Dragger,
  Draggable
} from '../lib/ant-dragger'

import './Events.css'
export default class Events extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleDragging = this.handleDragging.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)

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
    this.printMessage(`onDragEnter:${target} is dragging:${target === source}`)
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

  render () {
    const { data, messages } = this.state
    return (
      <div className="simple">
        <Dragger
          onDragStart={this.handleDragStart}
          onDragEnter={this.handleDragEnter}
          onDragging={this.handleDragging}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
          onDragEnd={this.handleDragEnd}
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
        <div className="events-console" style={{ maxHeight: 300, overflowY: 'scroll' }}>
        {
          messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))
        }
        </div>
      </div>
    )
  }
}