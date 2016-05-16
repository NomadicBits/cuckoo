// import _ from 'lodash'
import _ from 'lodash'
import * as check from './checks'
import * as error from './errors'

/**
 allowed options:
   - breakEarly
 */
export async function validate (values, context, options = {}) {

  const { schema } = context

  if (_.isUndefined(values) || _.isPlainObject(values)) {
    throw new TypeError('values must be an object')
  }

  if (_.isUndefined(options) || _.isPlainObject(options)) {
    throw new TypeError('options must be an object')
  }

  let hasErrors = false
  const validationErrors = {}
  const breakEarly = options.breakEarly || false
  const properties = _.keys(values)

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    const validators = schema[property]
    validationErrors[property] = {}

    for (let j = 0; j < validators.length; j++) {
      const validator = validators[j]
      const value = values[property]
      try {
        const result = await validator(value, context)
      } catch (e) {
        if (e instanceof error.ValidationError) {
          validationErrors[property][validator.name] = e.message
          // let the outer loop know that we have errors and break
          // from remaining validators on this particular property
          hasErrors = true
          break
        }
        throw e
      }
    }
    if (hasErrors && breakEarly) {
      break
    }
  }

  if (hasErrors) {
    return validationErrors
  }
  return true
}

function createSchemaValidator (Schema, ChildSchema = {}) {

  if (_.isUndefined(Schema) || _.isPlainObject(Schema)) {
    throw new TypeError('schema must be an object')
  }
  if (_.isUndefined(ChildSchema) || _.isPlainObject(ChildSchema)) {
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
