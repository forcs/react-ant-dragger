'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EVENT_FUNC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EventDispatcher = require('./EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _EventCreator = require('./EventCreator');

var _EventCreator2 = _interopRequireDefault(_EventCreator);

var _reactDnd = require('react-dnd');

var _EventType = require('./EventType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EVENT_FUNC = (_EVENT_FUNC = {}, _defineProperty(_EVENT_FUNC, _EventType.BEGIN_DRAG, 'onDragStart'), _defineProperty(_EVENT_FUNC, _EventType.END_DRAG, 'onDragEnd'), _defineProperty(_EVENT_FUNC, _EventType.HOVER, 'onDragging'), _defineProperty(_EVENT_FUNC, _EventType.ENTER, 'onDragEnter'), _defineProperty(_EVENT_FUNC, _EventType.LEAVE, 'onDragLeave'), _defineProperty(_EVENT_FUNC, _EventType.DROP, 'onDrop'), _defineProperty(_EVENT_FUNC, _EventType.CAN_DRAG, 'canDrag'), _defineProperty(_EVENT_FUNC, _EventType.CAN_DROP, 'canDrop'), _EVENT_FUNC);

var noop = function noop() {};

var Dragger = function (_React$Component) {
  _inherits(Dragger, _React$Component);

  function Dragger(props, context) {
    _classCallCheck(this, Dragger);

    var _this = _possibleConstructorReturn(this, (Dragger.__proto__ || Object.getPrototypeOf(Dragger)).call(this, props, context));

    _this.notifyHandler = _this.notifyHandler.bind(_this);
    _this.dispatcher = (0, _EventDispatcher2.default)(_this.notifyHandler);
    return _this;
  }

  _createClass(Dragger, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        dispatcher: this.dispatcher,
        draggerType: this.props.draggerType,
        draggerPreview: this.props.draggerPreview
      };
    }
  }, {
    key: 'notifyHandler',
    value: function notifyHandler(type, _ref) {
      var target = _ref.target,
          source = _ref.source,
          props = _ref.props,
          component = _ref.component;

      var fn = this.props[EVENT_FUNC[type]];
      if (type === _EventType.CAN_DROP && !fn) {
        fn = this.props.canDrag;
      }
      if (!fn) {
        console.warn('Unknown event type', type);
      }
      return fn && fn((0, _EventCreator2.default)(source, target)(props), props, component);
    }
  }, {
    key: 'render',
    value: function render() {
      var connectDropTarget = this.props.connectDropTarget;


      return connectDropTarget(_react2.default.Children.only(this.props.children));
    }
  }]);

  return Dragger;
}(_react2.default.Component);

Dragger.propTypes = {
  onDragStart: _propTypes2.default.func,
  onDragEnd: _propTypes2.default.func,
  onDrop: _propTypes2.default.func,
  onDragging: _propTypes2.default.func,
  onDragEnter: _propTypes2.default.func,
  onDragLeave: _propTypes2.default.func,
  canDrag: _propTypes2.default.func,
  canDrop: _propTypes2.default.func,
  draggerType: _propTypes2.default.string,
  draggerPreview: _propTypes2.default.func
};
Dragger.defaultProps = {
  onDragStart: noop,
  onDragEnd: noop,
  onDrop: noop,
  onDragging: noop,
  onDragEnter: noop,
  onDragLeave: noop,
  canDrag: function canDrag() {
    return true;
  },
  canDrop: undefined,
  draggerType: '__dragger__',
  draggerPreview: undefined
};
Dragger.childContextTypes = {
  dispatcher: _propTypes2.default.func,
  draggerType: _propTypes2.default.string,
  draggerPreview: _propTypes2.default.func
};
Dragger.contextTypes = {
  dragDropManager: _propTypes2.default.object
};

var Wrapper = function (_React$Component2) {
  _inherits(Wrapper, _React$Component2);

  function Wrapper(props) {
    _classCallCheck(this, Wrapper);

    var _this2 = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

    _this2.dropTarget = {
      hover: _this2.handleContainerHover.bind(_this2)
    };

    _this2.edgeWidth = _this2.props.edgeWidth;
    if (typeof _this2.edgeWidth === 'number') {
      var v = _this2.edgeWidth;
      _this2.edgeWidth = {
        left: v,
        top: v,
        right: v,
        bottom: v
      };
    }
    _this2.cachedWrapped = undefined;
    return _this2;
  }

  _createClass(Wrapper, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cachedWrapped = undefined;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refreshBoundingRect();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.refreshBoundingRect();
    }
  }, {
    key: 'handleContainerHover',
    value: function handleContainerHover(props, monitor, component) {
      var _monitor$getClientOff = monitor.getClientOffset(),
          clientX = _monitor$getClientOff.x,
          clientY = _monitor$getClientOff.y;

      var _containerBoundingRec = this.containerBoundingRect,
          left = _containerBoundingRec.left,
          top = _containerBoundingRec.top,
          right = _containerBoundingRec.right,
          bottom = _containerBoundingRec.bottom;
      var _edgeWidth = this.edgeWidth,
          edgeLeft = _edgeWidth.left,
          edgeTop = _edgeWidth.top,
          edgeRight = _edgeWidth.right,
          edgeBottom = _edgeWidth.bottom;

      var containerEdge = {
        left: left + edgeLeft,
        top: top + edgeTop,
        right: right - edgeRight,
        bottom: bottom - edgeBottom
      };
      var strike = {
        left: clientX <= containerEdge.left,
        top: clientY <= containerEdge.top,
        right: clientX >= containerEdge.right,
        bottom: clientY >= containerEdge.bottom
      };

      if (strike.left || strike.top || strike.right || strike.bottom) {
        this.props.onDragEdge({
          strike: strike,
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
        }, props, component);
      }
    }
  }, {
    key: 'refreshBoundingRect',
    value: function refreshBoundingRect() {
      var _this3 = this;

      setTimeout(function () {
        var el = _reactDom2.default.findDOMNode(_this3);
        _this3.containerBoundingRect = el.getBoundingClientRect();
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.cachedWrapped) {
        this.cachedWrapped = (0, _reactDnd.DropTarget)(this.props.draggerType, this.dropTarget, function (collect, monitor) {
          return {
            connectDropTarget: collect.dropTarget()
          };
        })(Dragger);
      }
      var Wrap = this.cachedWrapped;

      return _react2.default.createElement(
        Wrap,
        this.props,
        this.props.children
      );
    }
  }]);

  return Wrapper;
}(_react2.default.Component);

Wrapper.propTypes = {
  onDragEdge: _propTypes2.default.func,
  edgeWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]),
  draggerType: _propTypes2.default.string
};
Wrapper.defaultProps = {
  onDragEdge: noop,
  edgeWidth: 20,
  draggerType: '__dragger__'
};
exports.default = Wrapper;