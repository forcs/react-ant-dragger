import React from 'react'

import Edge from './edge'
import Events from './events'
import Handler from './handler'
import Simple from './simple'

export default [
  {
    link: '/',
    index: true,
    title: 'Index',
    component: () => (<div>Hello:)</div>)
  },
  {
    link: '/simple',
    title: 'Simple',
    component: Simple
  },
  {
    link: '/events',
    title: 'Events',
    component: Events
  },
  {
    link: '/handler',
    title: 'Handler',
    component: Handler
  },
  {
    link: '/edge',
    title: 'Edge',
    component: Edge
  }
]