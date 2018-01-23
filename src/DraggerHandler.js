import React from 'react'
import PropTypes from 'prop-types'

class DraggerHandler extends React.Component {
  static contextTypes = {
    dragSourceCreator: PropTypes.func,
    dragHandlerType: PropTypes.string,
    dragCursor: PropTypes.string
  }

  static propTypes = {
    wrapTag: PropTypes.string
  }

  static defaultProps = {
    wrapTag: 'div'
  }

  render () {
    const {
      dragSourceCreator,
      dragHandlerType,
      dragCursor
    } = this.context

    const style = {
      cursor: dragCursor,
      ...this.props.style
    }
    const className = this.props.className

    let children = this.props.children
    if (dragHandlerType === 'handler') {
      const Tag = this.props.wrapTag
      children = dragSourceCreator(
        <Tag className={className} style={style}>{children}</Tag>
      )
    }
    return children
  }
}

export default DraggerHandler
