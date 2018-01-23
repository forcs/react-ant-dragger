'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDnd = require('react-dnd');

var _shallowEqual = require('react-dnd/lib/utils/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _EventType = require('./EventType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Draggable = function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable() {
    _classCallCheck(this, Draggable);

    return _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).apply(this, arguments));
  }

  _createClass(Draggable, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        dragSourceCreator: this.props.connectDragSource,
        dragCursor: this.props.dragCursor,
        dragHandlerType: this.props.dragHandlerType
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          children = _props.children,
          dragToken = _props.dragToken,
          draggerPreview = _props.draggerPreview,
          connectDragPreview = _props.connectDragPreview;


      if (draggerPreview && typeof draggerPreview === 'function') {
        var node = draggerPreview(dragToken(), children.props);
        if (typeof node === 'function') {
          node(connectDragPreview);
        } else if (typeof node.then === 'function') {
          node.then(connectDragPreview);
        } else {
          connectDragPreview(node);
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props,
          dragToken = _props2.dragToken,
          dispatcher = _props2.dispatcher,
          currIsOver = _props2.isOver,
          item = _props2.item;
      var prevIsOver = prevProps.isOver;


      if (!prevIsOver && currIsOver) {
        // enter
        dispatcher(_EventType.ENTER, {
          source: item && item.$source,
          target: dragToken(),
          props: this.props,
          component: this
        });
      } else if (!currIsOver && prevIsOver) {
        // leave
        dispatcher(_EventType.LEAVE, {
          source: item && item.$source,
          target: dragToken(),
          props: this.props,
          component: this
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          children = _props3.children,
          dispatcher = _props3.dispatcher,
          dragToken = _props3.dragToken,
          dragCursor = _props3.dragCursor,
          draggingHint = _props3.draggingHint,
          dragHandlerType = _props3.dragHandlerType,
          Tag = _props3.wrapTag,
          wrapStyle = _props3.wrapStyle,
          wrapClassName = _props3.wrapClassName,
          draggerPreview = _props3.draggerPreview,
          connectDragSource = _props3.connectDragSource,
          connectDropTarget = _props3.connectDropTarget,
          connectDragPreview = _props3.connectDragPreview,
          isDragging = _props3.isDragging,
          isOver = _props3.isOver,
          item = _props3.item,
          itemType = _props3.itemType,
          differenceFromInitialOffset = _props3.differenceFromInitialOffset,
          initialClientOffset = _props3.initialClientOffset,
          initialSourceClientOffset = _props3.initialSourceClientOffset,
          clientOffset = _props3.clientOffset,
          sourceClientOffset = _props3.sourceClientOffset,
          otherProps = _objectWithoutProperties(_props3, ['children', 'dispatcher', 'dragToken', 'dragCursor', 'draggingHint', 'dragHandlerType', 'wrapTag', 'wrapStyle', 'wrapClassName', 'draggerPreview', 'connectDragSource', 'connectDropTarget', 'connectDragPreview', 'isDragging', 'isOver', 'item', 'itemType', 'differenceFromInitialOffset', 'initialClientOffset', 'initialSourceClientOffset', 'clientOffset', 'sourceClientOffset']);

      var className = wrapClassName;
      if (typeof className !== 'string' && typeof className.join === 'function') {
        className = className.join(' ');
      }

      var style = _extends({
        cursor: dragHandlerType !== 'default' ? 'auto' : dragCursor
      }, wrapStyle);

      var props = _extends({
        className: className,
        style: style
      }, otherProps);

      var child = children;
      if (typeof child !== 'string') {
        child = _react2.default.Children.only(child);
      }

      if (isDragging && typeof draggingHint === 'function' && differenceFromInitialOffset !== null) {
        var newProps = draggingHint(props, child);
        if (newProps) {
          props = newProps;
        }
      }

      if (typeof child.type !== 'string') {
        child = _react2.default.createElement(
          Tag,
          props,
          child
        );
      } else {
        child = _react2.default.cloneElement(child, _extends({}, child.props, props, {
          style: _extends({}, child.props.style, props.style)
        }));
      }

      child = connectDropTarget(child);
      if (dragHandlerType === 'default') {
        child = connectDragSource(child);
      }
      return child;
    }
  }]);

  return Draggable;
}(_react2.default.Component);

Draggable.childContextTypes = {
  dragSourceCreator: _propTypes2.default.func,
  dragCursor: _propTypes2.default.string,
  dragHandlerType: _propTypes2.default.string
};

var DraggableWrapper = function (_React$Component2) {
  _inherits(DraggableWrapper, _React$Component2);

  function DraggableWrapper(props, context) {
    _classCallCheck(this, DraggableWrapper);

    var _this2 = _possibleConstructorReturn(this, (DraggableWrapper.__proto__ || Object.getPrototypeOf(DraggableWrapper)).call(this, props, context));

    _this2.dragSource = {
      beginDrag: _this2.dispatchBeginDragEvent.bind(_this2),
      endDrag: _this2.dispatchEndDragEvent.bind(_this2),
      canDrag: _this2.dispatchCanDragEvent.bind(_this2)
    };
    _this2.dropTarget = {
      hover: _this2.dispatchHoverEvent.bind(_this2),
      drop: _this2.dispatchDropEvent.bind(_this2),
      canDrop: _this2.dispatchCanDropEvent.bind(_this2)
    };

    _this2.cachedWrapped = undefined;
    return _this2;
  }

  _createClass(DraggableWrapper, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cachedWrapped = undefined;
    }
  }, {
    key: 'dispatchBeginDragEvent',
    value: function dispatchBeginDragEvent(props, monitor, component) {
      var source = this.props.dragToken();
      var result = this.context.dispatcher(_EventType.BEGIN_DRAG, {
        source: source,
        props: props,
        component: component
      });
      if (result === undefined) {
        result = {};
      }
      if (result.dragToken === undefined) {
        result.dragToken = source;
      }
      result.$target = result.$source = result.dragToken;
      return result;
    }
  }, {
    key: 'dispatchEndDragEvent',
    value: function dispatchEndDragEvent(props, monitor, component) {
      var _monitor$getItem = monitor.getItem(),
          target = _monitor$getItem.$target,
          source = _monitor$getItem.$source;

      this.context.dispatcher(_EventType.END_DRAG, {
        target: target,
        source: source,
        props: props,
        component: component
      });
    }
  }, {
    key: 'dispatchCanDragEvent',
    value: function dispatchCanDragEvent(props, monitor) {
      var source = this.props.dragToken();
      var result = this.context.dispatcher(_EventType.CAN_DRAG, {
        source: source,
        props: props
      });
      if (result === undefined) {
        result = true;
      }
      return result;
    }
  }, {
    key: 'dispatchHoverEvent',
    value: function dispatchHoverEvent(props, monitor, component) {
      var current = component.props.dragToken();
      var source = monitor.getItem().$source;

      if ((0, _shallowEqual2.default)(current, source) && current === source) {
        return;
      }

      monitor.getItem().$target = current;
      var handled = this.context.dispatcher(_EventType.HOVER, {
        target: current,
        source: source,
        props: props,
        component: component
      });

      if (handled && handled.constructor === current.constructor) {
        monitor.getItem().$target = handled;
      }
      return handled;
    }
  }, {
    key: 'dispatchDropEvent',
    value: function dispatchDropEvent(props, monitor, component) {
      var _monitor$getItem2 = monitor.getItem(),
          target = _monitor$getItem2.$target,
          source = _monitor$getItem2.$source;

      var handled = this.context.dispatcher(_EventType.DROP, {
        target: target,
        source: source,
        props: props,
        component: component
      });
      return handled;
    }
  }, {
    key: 'dispatchCanDropEvent',
    value: function dispatchCanDropEvent(props, monitor) {
      var _monitor$getItem3 = monitor.getItem(),
          target = _monitor$getItem3.$target,
          source = _monitor$getItem3.$source;

      var result = this.context.dispatcher(_EventType.CAN_DROP, {
        target: target,
        source: source,
        props: props
      });
      if (result === undefined) {
        result = true;
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          children = _props4.children,
          dragToken = _props4.dragToken,
          dragCursor = _props4.dragCursor,
          draggingHint = _props4.draggingHint,
          wrapTag = _props4.wrapTag,
          wrapStyle = _props4.wrapStyle,
          wrapClassName = _props4.wrapClassName,
          otherProps = _objectWithoutProperties(_props4, ['children', 'dragToken', 'dragCursor', 'draggingHint', 'wrapTag', 'wrapStyle', 'wrapClassName']);

      var _context = this.context,
          dispatcher = _context.dispatcher,
          draggerType = _context.draggerType,
          draggerPreview = _context.draggerPreview;


      if (!this.cachedWrapped) {
        this.cachedWrapped = (0, _reactDnd.DragSource)(draggerType, this.dragSource, function (connect, monitor) {
          return {
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging(),
            initialClientOffset: monitor.getInitialClientOffset(),
            initialSourceClientOffset: monitor.getInitialSourceClientOffset()
          };
        })((0, _reactDnd.DropTarget)(draggerType, this.dropTarget, function (connect, monitor) {
          return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver({ shallow: true }),
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
            clientOffset: monitor.getClientOffset(),
            sourceClientOffset: monitor.getSourceClientOffset()
          };
        })(Draggable));
      }
      var Wrapped = this.cachedWrapped;

      var wrappedProps = {
        dragCursor: dragCursor,
        draggingHint: draggingHint,
        wrapTag: wrapTag,
        wrapStyle: wrapStyle,
        wrapClassName: wrapClassName,
        draggerPreview: draggerPreview,
        dragToken: dragToken,
        dispatcher: dispatcher
      };

      return _react2.default.createElement(
        Wrapped,
        _extends({}, wrappedProps, otherProps),
        children
      );
    }
  }]);

  return DraggableWrapper;
}(_react2.default.Component);

DraggableWrapper.contextTypes = {
  dispatcher: _propTypes2.default.func,
  draggerType: _propTypes2.default.string,
  dragDropManager: _propTypes2.default.object,
  draggerPreview: _propTypes2.default.func
};
DraggableWrapper.propTypes = {
  dragToken: _propTypes2.default.func.isRequired,
  draggingHint: _propTypes2.default.func,
  dragHandlerType: _propTypes2.default.oneOf(['default', 'handler']),
  dragCursor: _propTypes2.default.oneOf(['default', 'move', 'pointer']),
  wrapTag: _propTypes2.default.string,
  wrapStyle: _propTypes2.default.object,
  wrapClassName: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string])
};
DraggableWrapper.defaultProps = {
  wrapTag: 'div',
  dragCursor: 'default',
  dragHandlerType: 'default',
  wrapStyle: {},
  wrapClassName: ''
};
exports.default = DraggableWrapper;