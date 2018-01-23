"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (source, target) {
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
};