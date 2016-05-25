'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsNotNullError = exports.IsGreaterError = exports.IsIntegerError = exports.IsNumberError = exports.IsPresentError = exports.IsWhitelistError = exports.ValidationError = undefined;

var _createError = require('@corelate/create-error');

var _createError2 = _interopRequireDefault(_createError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationError = exports.ValidationError = (0, _createError2.default)('ValidationError');

var IsWhitelistError = exports.IsWhitelistError = (0, _createError2.default)(ValidationError, 'IsWhitelistError', {
  code: '1000',
  message: 'Property not allowed'
});

var IsPresentError = exports.IsPresentError = (0, _createError2.default)(ValidationError, 'IsPresentError', {
  code: '1001',
  message: 'Can not be empty'
});

var IsNumberError = exports.IsNumberError = (0, _createError2.default)(ValidationError, 'IsNumberError', {
  code: '1002',
  message: 'Must be a number'
});

var IsIntegerError = exports.IsIntegerError = (0, _createError2.default)(ValidationError, 'IsIntegerError', {
  code: '1003',
  message: 'Must be an integer'
});

var IsGreaterError = exports.IsGreaterError = (0, _createError2.default)(ValidationError, 'IsGreaterError', {
  code: '1004',
  message: 'Must be lower than provided value'
});

var IsNotNullError = exports.IsNotNullError = (0, _createError2.default)(ValidationError, 'IsNotNullError', {
  code: '1005',
  message: 'Must not be null'
});