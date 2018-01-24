(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('react-dnd'), require('react-dom'), require('react-dnd-html5-backend')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'react-dnd', 'react-dom', 'react-dnd-html5-backend'], factory) :
    (factory((global.AntDragger = {}), global.React, global.PropTypes, global.ReactDnD, global.ReactDOM, global.ReactDnDHTML5Backend));
}(this, (function (exports, React, PropTypes, reactDnd, ReactDOM, HTML5Backend) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
  HTML5Backend = HTML5Backend && HTML5Backend.hasOwnProperty('default') ? HTML5Backend['default'] : HTML5Backend;

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var shallowEqual_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = shallowEqual;

    function shallowEqual(objA, objB) {
      if (objA === objB) {
        return true;
      }

      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);

      if (keysA.length !== keysB.length) {
        return false;
      }

      // Test for A's keys different from B.
      var hasOwn = Object.prototype.hasOwnProperty;
      for (var i = 0; i < keysA.length; i += 1) {
        if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
          return false;
        }

        var valA = objA[keysA[i]];
        var valB = objB[keysA[i]];

        if (valA !== valB) {
          return false;
        }
      }

      return true;
    }
  });

  var shallowEqual = unwrapExports(shallowEqual_1);

  var BEGIN_DRAG = 'BEGIN_DRAG';
  var END_DRAG = 'END_DRAG';
  var DROP = 'DROP';
  var HOVER = 'HOVER';
  var ENTER = 'ENTER';
  var LEAVE = 'LEAVE';
  var CAN_DRAG = 'CAN_DRAG';
  var CAN_DROP = 'CAN_DROP';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };



  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };









  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Draggable = function (_React$Component) {
    inherits(Draggable, _React$Component);

    function Draggable() {
      classCallCheck(this, Draggable);
      return possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).apply(this, arguments));
    }

    createClass(Draggable, [{
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
          dispatcher(ENTER, {
            source: item && item.$source,
            target: dragToken(),
            props: this.props,
            component: this
          });
        } else if (!currIsOver && prevIsOver) {
          // leave
          dispatcher(LEAVE, {
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
          otherProps = objectWithoutProperties(_props3, ['children', 'dispatcher', 'dragToken', 'dragCursor', 'draggingHint', 'dragHandlerType', 'wrapTag', 'wrapStyle', 'wrapClassName', 'draggerPreview', 'connectDragSource', 'connectDropTarget', 'connectDragPreview', 'isDragging', 'isOver', 'item', 'itemType', 'differenceFromInitialOffset', 'initialClientOffset', 'initialSourceClientOffset', 'clientOffset', 'sourceClientOffset']);


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
          child = React.Children.only(child);
        }

        if (isDragging && typeof draggingHint === 'function' && differenceFromInitialOffset !== null) {
          var newProps = draggingHint(props, child);
          if (newProps) {
            props = newProps;
          }
        }

        if (typeof child.type !== 'string') {
          child = React.createElement(
            Tag,
            props,
            child
          );
        } else {
          child = React.cloneElement(child, _extends({}, child.props, props, {
            style: _extends({}, child.props.style, props.style)
          }));
        }

        if (!draggerPreview) {
          child = connectDragPreview(child);
        }
        if (dragHandlerType === 'default') {
          child = connectDragSource(child);
        }
        return connectDropTarget(child);
      }
    }]);
    return Draggable;
  }(React.Component);

  Draggable.childContextTypes = {
    dragSourceCreator: PropTypes.func,
    dragCursor: PropTypes.string,
    dragHandlerType: PropTypes.string
  };

  var DraggableWrapper = function (_React$Component2) {
    inherits(DraggableWrapper, _React$Component2);

    function DraggableWrapper(props, context) {
      classCallCheck(this, DraggableWrapper);

      var _this2 = possibleConstructorReturn(this, (DraggableWrapper.__proto__ || Object.getPrototypeOf(DraggableWrapper)).call(this, props, context));

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

    createClass(DraggableWrapper, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.cachedWrapped = undefined;
      }
    }, {
      key: 'dispatchBeginDragEvent',
      value: function dispatchBeginDragEvent(props, monitor, component) {
        var source = this.props.dragToken();
        var result = this.context.dispatcher(BEGIN_DRAG, {
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

        this.context.dispatcher(END_DRAG, {
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
        var result = this.context.dispatcher(CAN_DRAG, {
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

        if (shallowEqual(current, source) && current === source) {
          return;
        }

        monitor.getItem().$target = current;
        var handled = this.context.dispatcher(HOVER, {
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

        var handled = this.context.dispatcher(DROP, {
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

        var result = this.context.dispatcher(CAN_DROP, {
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
          otherProps = objectWithoutProperties(_props4, ['children', 'dragToken', 'dragCursor', 'draggingHint', 'wrapTag', 'wrapStyle', 'wrapClassName']);
        var _context = this.context,
          dispatcher = _context.dispatcher,
          draggerType = _context.draggerType,
          draggerPreview = _context.draggerPreview;


        if (!this.cachedWrapped) {
          this.cachedWrapped = reactDnd.DragSource(draggerType, this.dragSource, function (connect, monitor) {
            return {
              connectDragSource: connect.dragSource(),
              connectDragPreview: connect.dragPreview(),
              isDragging: monitor.isDragging(),
              initialClientOffset: monitor.getInitialClientOffset(),
              initialSourceClientOffset: monitor.getInitialSourceClientOffset()
            };
          })(reactDnd.DropTarget(draggerType, this.dropTarget, function (connect, monitor) {
            return {
              connectDropTarget: connect.dropTarget(),
              isOver: monitor.isOver({
                shallow: true
              }),
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

        return React.createElement(
          Wrapped,
          _extends({}, wrappedProps, otherProps),
          children
        );
      }
    }]);
    return DraggableWrapper;
  }(React.Component);

  DraggableWrapper.contextTypes = {
    dispatcher: PropTypes.func,
    draggerType: PropTypes.string,
    dragDropManager: PropTypes.object,
    draggerPreview: PropTypes.func
  };
  DraggableWrapper.propTypes = {
    dragToken: PropTypes.func.isRequired,
    draggingHint: PropTypes.func,
    dragHandlerType: PropTypes.oneOf(['default', 'handler']),
    dragCursor: PropTypes.oneOf(['default', 'move', 'pointer']),
    wrapTag: PropTypes.string,
    wrapStyle: PropTypes.object,
    wrapClassName: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string])
  };
  DraggableWrapper.defaultProps = {
    wrapTag: 'div',
    dragCursor: 'default',
    dragHandlerType: 'default',
    wrapStyle: {},
    wrapClassName: ''
  };

  var eventDispatcher = (function (fn) {
    return function (type, event) {
      return fn(type, event);
    };
  });

  var eventCreator = (function (source, target) {
    return function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var base = {
        source: source,
        target: target
      };
      var extra = {
        item: options.item,
        itemType: options.itemType,
        isDragging: options.isDragging,
        isOver: options.isOver,

        differenceFromInitialOffset: options.differenceFromInitialOffset,
        initialClientOffset: options.initialClientOffset,
        initialSourceClientOffset: options.initialSourceClientOffset,
        clientOffset: options.clientOffset,
        sourceClientOffset: options.sourceClientOffset
      };

      return _extends({}, base, extra);
    };
  });

  var _EVENT_FUNC;

  var EVENT_FUNC = (_EVENT_FUNC = {}, defineProperty(_EVENT_FUNC, BEGIN_DRAG, 'onDragStart'), defineProperty(_EVENT_FUNC, END_DRAG, 'onDragEnd'), defineProperty(_EVENT_FUNC, HOVER, 'onDragging'), defineProperty(_EVENT_FUNC, ENTER, 'onDragEnter'), defineProperty(_EVENT_FUNC, LEAVE, 'onDragLeave'), defineProperty(_EVENT_FUNC, DROP, 'onDrop'), defineProperty(_EVENT_FUNC, CAN_DRAG, 'canDrag'), defineProperty(_EVENT_FUNC, CAN_DROP, 'canDrop'), _EVENT_FUNC);

  var noop = function noop() {};

  var Dragger = function (_React$Component) {
    inherits(Dragger, _React$Component);

    function Dragger(props, context) {
      classCallCheck(this, Dragger);

      var _this = possibleConstructorReturn(this, (Dragger.__proto__ || Object.getPrototypeOf(Dragger)).call(this, props, context));

      _this.notifyHandler = _this.notifyHandler.bind(_this);
      _this.dispatcher = eventDispatcher(_this.notifyHandler);
      return _this;
    }

    createClass(Dragger, [{
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
        if (type === CAN_DROP && !fn) {
          fn = this.props.canDrag;
        }
        if (!fn) {
          console.warn('Unknown event type', type);
        }
        return fn && fn(eventCreator(source, target)(props), props, component);
      }
    }, {
      key: 'render',
      value: function render() {
        var connectDropTarget = this.props.connectDropTarget;


        return connectDropTarget(React.Children.only(this.props.children));
      }
    }]);
    return Dragger;
  }(React.Component);

  Dragger.propTypes = {
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
    dispatcher: PropTypes.func,
    draggerType: PropTypes.string,
    draggerPreview: PropTypes.func
  };
  Dragger.contextTypes = {
    dragDropManager: PropTypes.object
  };

  var Wrapper = function (_React$Component2) {
    inherits(Wrapper, _React$Component2);

    function Wrapper(props) {
      classCallCheck(this, Wrapper);

      var _this2 = possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

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

    createClass(Wrapper, [{
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
          var el = ReactDOM.findDOMNode(_this3);
          _this3.containerBoundingRect = el.getBoundingClientRect();
        }, 0);
      }
    }, {
      key: 'render',
      value: function render() {
        if (!this.cachedWrapped) {
          this.cachedWrapped = reactDnd.DropTarget(this.props.draggerType, this.dropTarget, function (collect, monitor) {
            return {
              connectDropTarget: collect.dropTarget()
            };
          })(Dragger);
        }
        var Wrap = this.cachedWrapped;

        return React.createElement(
          Wrap,
          this.props,
          this.props.children
        );
      }
    }]);
    return Wrapper;
  }(React.Component);

  Wrapper.propTypes = {
    onDragEdge: PropTypes.func,
    edgeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    draggerType: PropTypes.string
  };
  Wrapper.defaultProps = {
    onDragEdge: noop,
    edgeWidth: 20,
    draggerType: '__dragger__'
  };

  var _DraggerContext = reactDnd.DragDropContext(HTML5Backend);

  var DraggerHandler = function (_React$Component) {
    inherits(DraggerHandler, _React$Component);

    function DraggerHandler() {
      classCallCheck(this, DraggerHandler);
      return possibleConstructorReturn(this, (DraggerHandler.__proto__ || Object.getPrototypeOf(DraggerHandler)).apply(this, arguments));
    }

    createClass(DraggerHandler, [{
      key: 'render',
      value: function render() {
        var _context = this.context,
          dragSourceCreator = _context.dragSourceCreator,
          dragHandlerType = _context.dragHandlerType,
          dragCursor = _context.dragCursor;


        var style = _extends({
          cursor: dragCursor
        }, this.props.style);
        var className = this.props.className;

        var children = this.props.children;
        if (dragHandlerType === 'handler') {
          var Tag = this.props.wrapTag;
          children = dragSourceCreator(React.createElement(
            Tag, {
              className: className,
              style: style
            },
            children
          ));
        }
        return children;
      }
    }]);
    return DraggerHandler;
  }(React.Component);

  DraggerHandler.contextTypes = {
    dragSourceCreator: PropTypes.func,
    dragHandlerType: PropTypes.string,
    dragCursor: PropTypes.string
  };
  DraggerHandler.propTypes = {
    wrapTag: PropTypes.string
  };
  DraggerHandler.defaultProps = {
    wrapTag: 'div'
  };

  var Draggable$1 = DraggableWrapper;
  var Dragger$1 = Wrapper;
  var DraggerContext = _DraggerContext;
  var DraggerHandler$1 = DraggerHandler;

  var index = {
    Draggable: Draggable$1,
    Dragger: Dragger$1,
    DraggerContext: DraggerContext,
    DraggerHandler: DraggerHandler$1
  };

  exports.Draggable = Draggable$1;
  exports.Dragger = Dragger$1;
  exports.DraggerContext = DraggerContext;
  exports.DraggerHandler = DraggerHandler$1;
  exports['default'] = index;

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

})));
//# sourceMappingURL=ant-dragger.js.map
