'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPresent = isPresent;
exports.isNumber = isNumber;
exports.isInteger = isInteger;
exports.isGreater = isGreater;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkTypes = require('check-types');

var _checkTypes2 = _interopRequireDefault(_checkTypes);

var _errors = require('./errors');

var error = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPresent(message) {
  return function validateIsPresent(value) {
    var notPresent = _lodash2.default.isUndefined(value);
    if (notPresent) {
      throw new error.IsPresentError(message);
    }
    return true;
  };
}

function isNumber(message) {
  return function validateIsNumber(value) {
    var number = Number(value);
    if (!_checkTypes2.default.number(number)) {
      throw new error.IsNumberError(message);
    }
    return true;
  };
}

function isInteger(message) {
  return function validateIsInteger(value) {
    var integer = Number(value);
    if (!_checkTypes2.default.integer(integer)) {
      throw new error.IsIntegerError(message);
    }
    return true;
  };
}

function isGreater(than, message) {
  return function validateIsGreater(value) {
    var number = Number(value);
    if (!_checkTypes2.default.greater(number, than)) {
      throw new error.IsGreaterError(message, { value: than });
    }
    return true;
  };
}