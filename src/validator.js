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
  const schemaProperties = _.keys(schema)

  if (shouldWhitelist) {
    const whitelist = _.keys(schema)
    const disallowed = _.difference(properties, whitelist)

    if (disallowed.length > 0) {
      result.hasErrors = true
      result.errors = _.reduce(disallowed, (acc, key) => {
        acc[key] = [new error.IsWhitelistError()]
        return acc
      }, {})

      return result
    }
  }

  for (let i = 0; i < schemaProperties.length; i++) {
    const property = schemaProperties[i]

    const validators = schema[property]
    result.errors[property] = []

    for (let j = 0; j < validators.length; j++) {
      const validator = validators[j]
      const value = values[property]
      try {
        const result = await validator(value, context)
      } catch (e) {
        if (e instanceof error.ValidationError) {
          result.hasErrors = true

          // evaluate the errors message template
          e.message = e.message(e.meta)

          result.errors[property].push(e)
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

function createSchemaValidator (Schema, ChildSchema = {}) {

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

export default createSchemaValidator
