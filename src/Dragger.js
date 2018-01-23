import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import eventDispatcher from './EventDispatcher'
import eventCreator from './EventCreator'

import {
  DropTarget
} from 'react-dnd'

import {
  BEGIN_DRAG,
  END_DRAG,
  HOVER,
  ENTER,
  LEAVE,
  DROP,
  CAN_DRAG,
  CAN_DROP
} from './EventType'

const EVENT_FUNC = {
  [BEGIN_DRAG]: 'onDragStart',
  [END_DRAG]: 'onDragEnd',
  [HOVER]: 'onDragging',
  [ENTER]: 'onDragEnter',
  [LEAVE]: 'onDragLeave',
  [DROP]: 'onDrop',
  [CAN_DRAG]: 'canDrag',
  [CAN_DROP]: 'canDrop'
}

const noop = () => {}

class Dragger extends React.Component {
  static propTypes = {
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrop: PropTypes.func,
    onDragging: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    canDrag: PropTypes.func,
    canDrop: PropTypes.func,
    draggerType: PropTypes.string,
    draggerPreview: PropTypes.func
  }

  static defaultProps = {
    onDragStart: noop,
    onDragEnd: noop,
    onDrop: noop,
    onDragging: noop,
    onDragEnter: noop,
    onDragLeave: noop,
    canDrag: () => true,
    canDrop: undefined,
    draggerType: '__dragger__',
    draggerPreview: undefined
  }

  static childContextTypes = {
    dispatcher: PropTypes.func,
    draggerType: PropTypes.string,
    draggerPreview: PropTypes.func
  }

  static contextTypes = {
    dragDropManager: PropTypes.object
  }

  constructor (props, context) {
    super(props, context)
    this.notifyHandler = this.notifyHandler.bind(this)
    this.dispatcher = eventDispatcher(this.notifyHandler)
  }

  getChildContext () {
    return {
      dispatcher: this.dispatcher,
      draggerType: this.props.draggerType,
      draggerPreview: this.props.draggerPreview
    }
  }

  notifyHandler (type, { target, source, props, component }) {
    let fn = this.props[EVENT_FUNC[type]]
    if (type === CAN_DROP && !fn) {
      fn = this.props.canDrag
    }
    if (!fn) {
      console.warn('Unknown event type', type)
    }
    return fn && fn(eventCreator(source, target)(props), props, component)
  }

  render () {
    const {
      connectDropTarget
    } = this.props

    return connectDropTarget(React.Children.only(this.props.children))
  }
}

class Wrapper extends React.Component {
  static propTypes = {
    onDragEdge: PropTypes.func,
    edgeWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    draggerType: PropTypes.string
  }

  static defaultProps = {
    onDragEdge: noop,
    edgeWidth: 20,
    draggerType: '__dragger__'
  }

  dropTarget = {
    hover: this.handleContainerHover.bind(this)
  }

  constructor (props) {
    super(props)
    this.edgeWidth = this.props.edgeWidth
    if (typeof this.edgeWidth === 'number') {
      const v = this.edgeWidth
      this.edgeWidth = {
        left: v,
        top: v,
        right: v,
        bottom: v
      }
    }
    this.cachedWrapped = undefined
  }

  componentWillUnmount () {
    this.cachedWrapped = undefined
  }

  componentDidMount () {
    this.refreshBoundingRect()
  }

  componentDidUpdate () {
    this.refreshBoundingRect()
  }

  handleContainerHover (props, monitor, component) {
    const {
      x: clientX,
      y: clientY
    } = monitor.getClientOffset()
    const {
      left, top, right, bottom
    } = this.containerBoundingRect
    const {
      left: edgeLeft,
      top: edgeTop,
      right: edgeRight,
      bottom: edgeBottom
    } = this.edgeWidth
    const containerEdge = {
      left: left + edgeLeft,
      top: top + edgeTop,
      right: right - edgeRight,
      bottom: bottom - edgeBottom
    }
    const strike = {
      left: clientX <= containerEdge.left,
      top: clientY <= containerEdge.top,
      right: clientX >= containerEdge.right,
      bottom: clientY >= containerEdge.bottom
    }

    if (strike.left || strike.top || strike.right || strike.bottom) {
      this.props.onDragEdge({
        strike,
        client: {
          x: clientX,
          y: clientY
        },
        edge: containerEdge,
        itemType: monitor.getItemType(),
        initialClientOffset: monitor.getInitialClientOffset(),
        initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
        clientOffset: monitor.getClientOffset(),
        sourceClientOffset: monitor.getSourceClientOffset(),
        differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset()
      }, props, component)
    }
  }

  refreshBoundingRect () {
    setTimeout(() => {
      const el = ReactDOM.findDOMNode(this)
      this.containerBoundingRect = el.getBoundingClientRect()
    }, 0)
  }

  render () {
    if (!this.cachedWrapped) {
      this.cachedWrapped = DropTarget(
        this.props.draggerType,
        this.dropTarget,
        (collect, monitor) => ({
          connectDropTarget: collect.dropTarget()
        })
      )(Dragger)
    }
    const Wrap = this.cachedWrapped

    return (
      <Wrap {...this.props}>{this.props.children}</Wrap>
    )
  }
}

export default Wrapper
