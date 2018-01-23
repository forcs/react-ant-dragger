"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn) {
  return function (type, event) {
    return fn(type, event);
  };
};