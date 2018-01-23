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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraggerHandler = function (_React$Component) {
  _inherits(DraggerHandler, _React$Component);

  function DraggerHandler() {
    _classCallCheck(this, DraggerHandler);

    return _possibleConstructorReturn(this, (DraggerHandler.__proto__ || Object.getPrototypeOf(DraggerHandler)).apply(this, arguments));
  }

  _createClass(DraggerHandler, [{
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
        children = dragSourceCreator(_react2.default.createElement(
          Tag,
          { className: className, style: style },
          children
        ));
      }
      return children;
    }
  }]);

  return DraggerHandler;
}(_react2.default.Component);

DraggerHandler.contextTypes = {
  dragSourceCreator: _propTypes2.default.func,
  dragHandlerType: _propTypes2.default.string,
  dragCursor: _propTypes2.default.string
};
DraggerHandler.propTypes = {
  wrapTag: _propTypes2.default.string
};
DraggerHandler.defaultProps = {
  wrapTag: 'div'
};
exports.default = DraggerHandler;