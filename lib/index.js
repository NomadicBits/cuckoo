'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.check = exports.createSchemaValidator = undefined;

var _validator = require('./validator');

Object.defineProperty(exports, 'createSchemaValidator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_validator).default;
  }
});

var _checks = require('./checks');

var _check = _interopRequireWildcard(_checks);

var _errors = require('./errors');

var _error = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.check = _check;
exports.error = _error;