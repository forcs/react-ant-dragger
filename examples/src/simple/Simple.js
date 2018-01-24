import React from 'react'
import {
  Dragger,
  Draggable
} from '../lib/ant-dragger'

import './Simple.css'
export default () => {

  const list = [
    'AAAAAAAAAAAAAAAAAAA',
    'BBBBBBBBBBBBBBBBBBB',
    'CCCCCCCCCCCCCCCCCCC',
    'DDDDDDDDDDDDDDDDDDD',
    'EEEEEEEEEEEEEEEEEEE',
    'FFFFFFFFFFFFFFFFFFF',
    'GGGGGGGGGGGGGGGGGGG',
    'HHHHHHHHHHHHHHHHHHH',
    'IIIIIIIIIIIIIIIIIII',
    'JJJJJJJJJJJJJJJJJJJ'
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