import React from 'react'
import {
  Dragger,
  Draggable
} from '../lib/ant-dragger'

import Syntax from '../lib/components/syntax'

import './Simple.css'

const code = `
import React from 'react'
import {
  Dragger,
  Draggable
} from 'react-ant-dragger'

export default () => {

  const list = [
    'AAAAAAAAAAAAAAAAAAA',
    'BBBBBBBBBBBBBBBBBBB',
    'CCCCCCCCCCCCCCCCCCC',
    'DDDDDDDDDDDDDDDDDDD',
    'EEEEEEEEEEEEEEEEEEE'
  ]

  return (
    <div className="simple">
      <Dragger>
        <ul>
        {
          list.map((item, index) => (
            // dragToken property is required
            <Draggable key={index} dragToken={() => (index + 1)}>
              <li>{item}</li>
            </Draggable>
          ))
        }
        </ul>
      </Dragger>
    </div>
  )
}
`
export default () => {

  const list = [
    'AAAAAAAAAAAAAAAAAAA',
    'BBBBBBBBBBBBBBBBBBB',
    'CCCCCCCCCCCCCCCCCCC',
    'DDDDDDDDDDDDDDDDDDD',
    'EEEEEEEEEEEEEEEEEEE'
  ]

  return (
    <div className="simple">
      <div className="demo">
        <Dragger>
          <ul>
          {
            list.map((item, index) => (
              // dragToken property is required
              <Draggable key={index} dragToken={() => (index + 1)}>
                <li>{item}</li>
              </Draggable>
            ))
          }
          </ul>
        </Dragger>
      </div>
      <Syntax>{code}</Syntax>
    </div>
    
  )
}