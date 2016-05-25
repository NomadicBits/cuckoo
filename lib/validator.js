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
   - whitelist // defaults to true
 */

var validate = exports.validate = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(values, context) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var schema, result, breakEarly, shouldWhitelist, properties, schemaProperties, whitelist, disallowed, i, property, validators, j, validator, value, _result;

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
            result = {
              hasErrors: false,
              errors: {}
            };
            breakEarly = _lodash2.default.has(options, 'breakEarly') ? options.breakEarly : true;
            shouldWhitelist = _lodash2.default.has(options, 'whitelist') ? options.whitelist : true;
            properties = _lodash2.default.keys(values);
            schemaProperties = _lodash2.default.keys(schema);

            if (!shouldWhitelist) {
              _context.next = 17;
              break;
            }

            whitelist = _lodash2.default.keys(schema);
            disallowed = _lodash2.default.difference(properties, whitelist);

            if (!(disallowed.length > 0)) {
              _context.next = 17;
              break;
            }

            result.hasErrors = true;
            result.errors = _lodash2.default.reduce(disallowed, function (acc, key) {
              acc[key] = [new error.IsWhitelistError()];
              return acc;
            }, {});

            return _context.abrupt('return', result);

          case 17:
            i = 0;

          case 18:
            if (!(i < schemaProperties.length)) {
              _context.next = 46;
              break;
            }

            property = schemaProperties[i];
            validators = schema[property];

            result.errors[property] = [];

            j = 0;

          case 23:
            if (!(j < validators.length)) {
              _context.next = 43;
              break;
            }

            validator = validators[j];
            value = values[property];
            _context.prev = 26;
            _context.next = 29;
            return validator(value, context);

          case 29:
            _result = _context.sent;
            _context.next = 40;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context['catch'](26);

            if (!(_context.t0 instanceof error.ValidationError)) {
              _context.next = 40;
              break;
            }

            result.hasErrors = true;

            // evaluate the errors message template
            _context.t0.message = _context.t0.message(_context.t0.meta);

            result.errors[property].push(_context.t0);
            // should we break from remaining validators on this particular property?

            if (!breakEarly) {
              _context.next = 40;
              break;
            }

            return _context.abrupt('break', 43);

          case 40:
            j++;
            _context.next = 23;
            break;

          case 43:
            i++;
            _context.next = 18;
            break;

          case 46:
            return _context.abrupt('return', result);

          case 47:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[26, 32]]);
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