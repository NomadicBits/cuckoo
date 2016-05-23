'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsPresentError = exports.ValidationError = undefined;

var _createError = require('create-error');

var _createError2 = _interopRequireDefault(_createError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationError = exports.ValidationError = (0, _createError2.default)('ValidationError');

var IsPresentError = exports.IsPresentError = (0, _createError2.default)(ValidationError, 'IsPresentError', {
  code: '1000',
  message: 'Can not be empty'
});