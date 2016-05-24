import _ from 'lodash'
import * as check from './checks'
import * as error from './errors'

/**
 allowed options:
   - breakEarly
   - whitelist // defaults to true
 */
export async function validate (values, context, options = {}) {

  const { schema } = context

  if (!_.isPlainObject(values)) {
    throw new TypeError('values must be an object')
  }

  if (!_.isPlainObject(options)) {
    throw new TypeError('options must be an object')
  }

  const result = {
    hasErrors: false,
    errors: {},
  }
  const breakEarly = _.has(options, 'breakEarly') ? options.breakEarly : true
  const shouldWhitelist = _.has(options, 'whitelist') ? options.whitelist : true
  const properties = _.keys(values)

  if (shouldWhitelist) {
    const whitelist = _.keys(schema)
    const disallowed = _.difference(properties, whitelist)

    if (disallowed.length > 0) {
      result.hasErrors = true
      result.errors = _.reduce(disallowed, (acc, key) => {
        acc[key] = { validateWhitelist: 'Property not allowed' }
        return acc
      }, {})

      return result
    }
  }

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]

    // don't check validators on properties not in schema
    if (!_.has(schema, property)) {
      break
    }

    const validators = schema[property]
    result.errors[property] = {}

    for (let j = 0; j < validators.length; j++) {
      const validator = validators[j]
      const value = values[property]
      try {
        const result = await validator(value, context)
      } catch (e) {
        if (e instanceof error.ValidationError) {
          result.hasErrors = true
          result.errors[property][validator.name] = e.message
          // should we break from remaining validators on this particular property?
          if (breakEarly) {
            break
          }
        }
      }
    }
  }

  return result
}

export function createSchemaValidator (Schema, ChildSchema = {}) {

  if (!_.isPlainObject(Schema)) {
    throw new TypeError('Schema must be an object')
  }
  if (!_.isPlainObject(ChildSchema)) {
    throw new TypeError('ChildSchema must be an object')
  }

  const schema = _.merge({}, Schema, ChildSchema)

  return async function createValidator (values, options) {

    const context = {
      schema,
      values,
    }

    return await validate(values, context, options)
  }
}
