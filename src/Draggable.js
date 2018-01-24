import React from 'react'
import PropTypes from 'prop-types'
import {
  DragSource,
  DropTarget
} from 'react-dnd'
import shallowEqual from 'react-dnd/lib/utils/shallowEqual'
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

class Draggable extends React.Component {
  static childContextTypes = {
    dragSourceCreator: PropTypes.func,
    dragCursor: PropTypes.string,
    dragHandlerType: PropTypes.string
  }

  getChildContext () {
    return {
      dragSourceCreator: this.props.connectDragSource,
      dragCursor: this.props.dragCursor,
      dragHandlerType: this.props.dragHandlerType
    }
  }

  componentDidMount () {
    const {
      children,

      dragToken,
      draggerPreview,
      connectDragPreview
    } = this.props

    if (draggerPreview && typeof draggerPreview === 'function') {
      const node = draggerPreview(dragToken(), children.props)
      if (typeof node === 'function') {
        node(connectDragPreview)
      } else if (typeof node.then === 'function') {
        node.then(connectDragPreview)
      } else {
        connectDragPreview(node)
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const {
      dragToken,
      dispatcher,
      isOver: currIsOver,
      item
    } = this.props
    const {
      isOver: prevIsOver
    } = prevProps

    if (!prevIsOver && currIsOver) { // enter
      dispatcher(ENTER, {
        source: item && item.$source,
        target: dragToken(),
        props: this.props,
        component: this
      })
    } else if (!currIsOver && prevIsOver) { // leave
      dispatcher(LEAVE, {
        source: item && item.$source,
        target: dragToken(),
        props: this.props,
        component: this
      })
    }
  }

  render () {
    const {
      children,

      dispatcher,
      dragToken,
      dragCursor,
      draggingHint,
      dragHandlerType,
      wrapTag: Tag,
      wrapStyle,
      wrapClassName,
      draggerPreview,

      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      isDragging,
      isOver,
      item,
      itemType,
      differenceFromInitialOffset,
      initialClientOffset,
      initialSourceClientOffset,
      clientOffset,
      sourceClientOffset,

      ...otherProps
    } = this.props

    let className = wrapClassName
    if (typeof className !== 'string' &&
        typeof className.join === 'function') {
      className = className.join(' ')
    }

    const style = {
      cursor: dragHandlerType !== 'default' ? 'auto' : dragCursor,
      ...wrapStyle
    }

    let props = {
      className,
      style,
      ...otherProps
    }

    let child = children
    if (typeof child !== 'string') {
      child = React.Children.only(child)
    }

    if ((isDragging &&
        typeof draggingHint === 'function' &&
        differenceFromInitialOffset !== null)) {
      const newProps = draggingHint(props, child)
      if (newProps) {
        props = newProps
      }
    }

    if (typeof child.type !== 'string') {
      child = (
        <Tag {...props}>{child}</Tag>
      )
    } else {
      child = React.cloneElement(child, {
        ...child.props,
        ...props,
        style: {
          ...child.props.style,
          ...props.style
        }
      })
    }

    if (!draggerPreview) {
      child = connectDragPreview(child)
    }
    if (dragHandlerType === 'default') {
      child = connectDragSource(child)
    }
    return connectDropTarget(child)
  }
}

class DraggableWrapper extends React.Component {
  static contextTypes = {
    dispatcher: PropTypes.func,
    draggerType: PropTypes.string,
    dragDropManager: PropTypes.object,
    draggerPreview: PropTypes.func
  }

  static propTypes = {
    dragToken: PropTypes.func.isRequired,
    draggingHint: PropTypes.func,
    dragHandlerType: PropTypes.oneOf(['default', 'handler']),
    dragCursor: PropTypes.oneOf(['default', 'move', 'pointer']),
    wrapTag: PropTypes.string,
    wrapStyle: PropTypes.object,
    wrapClassName: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ])
  }

  static defaultProps = {
    wrapTag: 'div',
    dragCursor: 'default',
    dragHandlerType: 'default',
    wrapStyle: {},
    wrapClassName: ''
  }

  dragSource = {
    beginDrag: this.dispatchBeginDragEvent.bind(this),
    endDrag: this.dispatchEndDragEvent.bind(this),
    canDrag: this.dispatchCanDragEvent.bind(this)
  }

  dropTarget = {
    hover: this.dispatchHoverEvent.bind(this),
    drop: this.dispatchDropEvent.bind(this),
    canDrop: this.dispatchCanDropEvent.bind(this)
  }

  constructor (props, context) {
    super(props, context)
    this.cachedWrapped = undefined
  }

  componentWillUnmount () {
    this.cachedWrapped = undefined
  }

  dispatchBeginDragEvent (props, monitor, component) {
    const source = this.props.dragToken()
    let result = this.context.dispatcher(
      BEGIN_DRAG,
      {
        source,
        props,
        component
      }
    )
    if (result === undefined) {
      result = {}
    }
    if (result.dragToken === undefined) {
      result.dragToken = source
    }
    result.$target = result.$source = result.dragToken
    return result
  }

  dispatchEndDragEvent (props, monitor, component) {
    const {
      $target: target,
      $source: source
    } = monitor.getItem()
    this.context.dispatcher(
      END_DRAG,
      {
        target,
        source,
        props,
        component
      }
    )
  }

  dispatchCanDragEvent (props, monitor) {
    const source = this.props.dragToken()
    let result = this.context.dispatcher(
      CAN_DRAG,
      {
        source,
        props
      }
    )
    if (result === undefined) {
      result = true
    }
    return result
  }

  dispatchHoverEvent (props, monitor, component) {
    const current = component.props.dragToken()
    const source = monitor.getItem().$source

    if (shallowEqual(current, source) && current === source) {
      return
    }

    monitor.getItem().$target = current
    const handled = this.context.dispatcher(
      HOVER,
      {
        target: current,
        source,
        props,
        component
      }
    )

    if (handled && (handled.constructor === current.constructor)) {
      monitor.getItem().$target = handled
    }
    return handled
  }

  dispatchDropEvent (props, monitor, component) {
    const {
      $target: target,
      $source: source
    } = monitor.getItem()
    const handled = this.context.dispatcher(
      DROP,
      {
        target,
        source,
        props,
        component
      }
    )
    return handled
  }

  dispatchCanDropEvent (props, monitor) {
    const {
      $target: target,
      $source: source
    } = monitor.getItem()
    let result = this.context.dispatcher(
      CAN_DROP,
      {
        target,
        source,
        props
      }
    )
    if (result === undefined) {
      result = true
    }
    return result
  }

  render () {
    const {
      children,
      dragToken,
      dragCursor,
      draggingHint,
      wrapTag,
      wrapStyle,
      wrapClassName,
      ...otherProps
    } = this.props

    const {
      dispatcher,
      draggerType,
      draggerPreview
    } = this.context

    if (!this.cachedWrapped) {
      this.cachedWrapped = DragSource(draggerType, this.dragSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        initialClientOffset: monitor.getInitialClientOffset(),
        initialSourceClientOffset: monitor.getInitialSourceClientOffset()
      }))(
        DropTarget(draggerType, this.dropTarget, (connect, monitor) => ({
          connectDropTarget: connect.dropTarget(),
          isOver: monitor.isOver({ shallow: true }),
          item: monitor.getItem(),
          itemType: monitor.getItemType(),
          differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
          clientOffset: monitor.getClientOffset(),
          sourceClientOffset: monitor.getSourceClientOffset()
        }))(Draggable)
      )
    }
    const Wrapped = this.cachedWrapped

    const wrappedProps = {
      dragCursor,
      draggingHint,
      wrapTag,
      wrapStyle,
      wrapClassName,
      draggerPreview,
      dragToken,
      dispatcher
    }

    return (
      <Wrapped {...wrappedProps} {...otherProps}>{children}</Wrapped>
    )
  }
}

export default DraggableWrapper
