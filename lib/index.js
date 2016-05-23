'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 allowed options:
   - breakEarly
 */

var validate = exports.validate = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(values, context) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var schema, hasErrors, validationErrors, breakEarly, properties, i, property, validators, j, validator, value, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            schema = context.schema;

            if (_lodash2.default.isPlainObject(values)) {
              _context.next = 3;
              break;
            }

            throw new TypeError('values must be an object');

          case 3:
            if (_lodash2.default.isPlainObject(options)) {
              _context.next = 5;
              break;
            }

            throw new TypeError('options must be an object');

          case 5:
            hasErrors = false;
            validationErrors = {};
            breakEarly = options.breakEarly || false;
            properties = _lodash2.default.keys(values);
            i = 0;

          case 10:
            if (!(i < properties.length)) {
              _context.next = 39;
              break;
            }

            property = properties[i];
            validators = schema[property];

            validationErrors[property] = {};

            j = 0;

          case 15:
            if (!(j < validators.length)) {
              _context.next = 34;
              break;
            }

            validator = validators[j];
            value = values[property];
            _context.prev = 18;
            _context.next = 21;
            return validator(value, context);

          case 21:
            result = _context.sent;
            _context.next = 31;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context['catch'](18);

            if (!(_context.t0 instanceof error.ValidationError)) {
              _context.next = 30;
              break;
            }

            validationErrors[property][validator.name] = _context.t0.message;
            // let the outer loop know that we have errors and break
            // from remaining validators on this particular property
            hasErrors = true;
            return _context.abrupt('break', 34);

          case 30:
            throw _context.t0;

          case 31:
            j++;
            _context.next = 15;
            break;

          case 34:
            if (!(hasErrors && breakEarly)) {
              _context.next = 36;
              break;
            }

            return _context.abrupt('break', 39);

          case 36:
            i++;
            _context.next = 10;
            break;

          case 39:
            if (!hasErrors) {
              _context.next = 41;
              break;
            }

            return _context.abrupt('return', validationErrors);

          case 41:
            return _context.abrupt('return', true);

          case 42:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[18, 24]]);
  }));
  return function validate(_x, _x2, _x3) {
    return ref.apply(this, arguments);
  };
}();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _checks = require('./checks');

var check = _interopRequireWildcard(_checks);

var _errors = require('./errors');

var error = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSchemaValidator(Schema) {
  var ChildSchema = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


  if (!_lodash2.default.isPlainObject(Schema)) {
    throw new TypeError('Schema must be an object');
  }
  if (!_lodash2.default.isPlainObject(ChildSchema)) {
    throw new TypeError('ChildSchema must be an object');
  }

  var schema = _lodash2.default.merge({}, Schema, ChildSchema);

  return function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(values, options) {
      var context;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              context = {
                schema: schema,
                values: values
              };
              _context2.next = 3;
              return validate(values, context, options);

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createValidator(_x6, _x7) {
      return ref.apply(this, arguments);
    }

    return createValidator;
  }();
}

exports.default = createSchemaValidator;