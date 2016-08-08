'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPresent = isPresent;
exports.isNotNull = isNotNull;
exports.isNumber = isNumber;
exports.isInteger = isInteger;
exports.isGreater = isGreater;
exports.isEmail = isEmail;
exports.isUUID = isUUID;
exports.isOneOf = isOneOf;
exports.isArray = isArray;
exports.hasLength = hasLength;
exports.isMatch = isMatch;

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

function isNotNull(message) {
  return function validateIsNotNull(value) {
    var number = Number(value);
    if (value === null) {
      throw new error.IsNotNullError(message);
    }
    return true;
  };
}

function isEmpty(value) {
  return value === undefined || value === null || value === '';
}

function isNumber(message) {
  return function validateIsNumber(value) {
    if (isEmpty(value)) {
      return true;
    }
    var number = Number(value);
    if (!_checkTypes2.default.number(number)) {
      throw new error.IsNumberError(message);
    }
    return true;
  };
}

function isInteger(message) {
  return function validateIsInteger(value) {
    if (isEmpty(value)) {
      return true;
    }
    var integer = Number(value);
    if (!_checkTypes2.default.integer(integer)) {
      throw new error.IsIntegerError(message);
    }
    return true;
  };
}

function isGreater(than, message) {
  return function validateIsGreater(value) {
    if (isEmpty(value)) {
      return true;
    }
    var number = Number(value);
    if (!_checkTypes2.default.greater(number, than)) {
      throw new error.IsGreaterError(message, { value: than });
    }
    return true;
  };
}

function isEmail(message) {
  return function validateIsEmail(value) {
    if (isEmpty(value)) {
      return true;
    }
    if (!value.match(/[^ ]+@[^ ]+\.[^ ]+/)) {
      throw new error.IsEmailError(message);
    }
    return true;
  };
}

function isUUID(message) {
  return function validateIsUUID(value) {
    if (isEmpty(value)) {
      return true;
    }
    if (!value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      throw new error.IsUUIDError(message);
    }
    return true;
  };
}

function isOneOf(list, message) {
  return function validateIsOneOf(value) {
    if (isEmpty(value)) {
      return true;
    }
    if (list.indexOf(value) === -1) {
      throw new error.IsOneOfError(message, { value: list.join() });
    }
    return true;
  };
}

function isArray(message) {
  return function validateIsArray(value) {
    if (isEmpty(value)) {
      return true;
    }
    if (!Array.isArray(value)) {
      throw new error.IsArrayError(message);
    }
    return true;
  };
}

function hasLength(length, message) {
  return function validateHasLength(value) {
    if (isEmpty(value)) {
      return true;
    }
    if (value.toString().length < length) {
      throw new error.HasLengthError(message, { value: length });
    }
    return true;
  };
}

function isMatch(regEx, message) {
  return function validateIsMatch(value) {
    if (isEmpty(value)) {
      return true;
    }
    try {
      if (!value.toString().match(regEx)) {
        throw new error.IsMatchError(message, { value: regEx.toString() });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    return true;
  };
}