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
   - breakEarly // defaults to true
   - whitelist // defaults to true
   - removeUnknown // defaults to false
 */
var validate = exports.validate = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(values, context) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var schema, result, breakEarly, shouldWhitelist, removeUnknown, properties, schemaProperties, whitelist, unknownProperties, i, _i, property, validators, j, validator, value, _result, template;

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
            removeUnknown = _lodash2.default.has(options, 'removeUnknown') ? options.removeUnknown : false;
            properties = _lodash2.default.keys(values);
            schemaProperties = _lodash2.default.keys(schema);
            whitelist = _lodash2.default.keys(schema);
            unknownProperties = _lodash2.default.difference(properties, whitelist);
            //console.log("Disallowed")
            //console.log(unknownProperties)
            //console.log(values)

            if (!(unknownProperties.length > 0)) {
              _context.next = 19;
              break;
            }

            if (removeUnknown) {
              for (i = 0; i < unknownProperties.length; i++) {
                delete values[unknownProperties[i]];
              }
            }

            //console.log('cleaned values')
            //console.log(values)

            if (!shouldWhitelist) {
              _context.next = 19;
              break;
            }

            result.hasErrors = true;
            result.errors = _lodash2.default.reduce(unknownProperties, function (acc, key) {
              acc[key] = [whitelistError];
              return acc;
            }, {});

            return _context.abrupt('return', result);

          case 19:
            _i = 0;

          case 20:
            if (!(_i < schemaProperties.length)) {
              _context.next = 49;
              break;
            }

            property = schemaProperties[_i];
            validators = schema[property];

            result.errors[property] = [];

            j = 0;

          case 25:
            if (!(j < validators.length)) {
              _context.next = 46;
              break;
            }

            validator = validators[j];
            value = values[property];
            _context.prev = 28;
            _context.next = 31;
            return validator(value, context);

          case 31:
            _result = _context.sent;
            _context.next = 43;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context['catch'](28);

            if (!(_context.t0 instanceof error.ValidationError)) {
              _context.next = 43;
              break;
            }

            result.hasErrors = true;

            // make error message into a string and eval it with metadata
            template = _lodash2.default.template(_context.t0.message);

            _context.t0.message = template(_context.t0.metadata);
            result.errors[property].push(_context.t0);
            // should we break from remaining validators on this particular property?

            if (!breakEarly) {
              _context.next = 43;
              break;
            }

            return _context.abrupt('break', 46);

          case 43:
            j++;
            _context.next = 25;
            break;

          case 46:
            _i++;
            _context.next = 20;
            break;

          case 49:

            //Everything went well, attach the cleaned object to the result
            result.values = values;

            return _context.abrupt('return', result);

          case 51:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[28, 34]]);
  }));

  return function validate(_x, _x2) {
    return _ref.apply(this, arguments);
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

// generate a default whitelistError
var whitelistError = new error.IsWhitelistError();
whitelistError.message = _lodash2.default.template(whitelistError.message)(whitelistError.metadata);

function createSchemaValidator(Schema) {
  var ChildSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if (!_lodash2.default.isPlainObject(Schema)) {
    throw new TypeError('Schema must be an object');
  }
  if (!_lodash2.default.isPlainObject(ChildSchema)) {
    throw new TypeError('ChildSchema must be an object');
  }

  var schema = _lodash2.default.extend({}, Schema, ChildSchema);

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(values, options) {
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

    function createValidator(_x5, _x6) {
      return _ref2.apply(this, arguments);
    }

    return createValidator;
  }();
}

exports.default = createSchemaValidator;