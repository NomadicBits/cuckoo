import _ from 'lodash'
import * as check from './checks'
import * as error from './errors'

// generate a default whitelistError
const whitelistError = new error.IsWhitelistError()
whitelistError.message = _.template(whitelistError.message)(whitelistError.metadata)

/**
 allowed options:
   - breakEarly // defaults to true
   - whitelist // defaults to true
   - removeUnknown // defaults to false
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
  const removeUnknown = _.has(options, 'removeUnknown') ? options.removeUnknown : false
  const properties = _.keys(values)
  const schemaProperties = _.keys(schema)

  const whitelist = _.keys(schema)
  const unknownProperties = _.difference(properties, whitelist)
  //console.log("Disallowed")
  //console.log(unknownProperties)
  //console.log(values)

  if (unknownProperties.length > 0) {
    if (removeUnknown) {
      for(let i = 0; i < unknownProperties.length; i++) {
        delete values[unknownProperties[i]]
      }
    }

    //console.log('cleaned values')
    //console.log(values)

    if (shouldWhitelist) {
      result.hasErrors = true
      result.errors = _.reduce(unknownProperties, (acc, key) => {
        acc[key] = [whitelistError]
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

          // make error message into a string and eval it with metadata
          const template = _.template(e.message)
          e.message = template(e.metadata)
          result.errors[property].push(e)
          // should we break from remaining validators on this particular property?
          if (breakEarly) {
            break
          }
        }
      }
    }
  }

  //Everything went well, attach the cleaned object to the result
  result.values = values

  return result
}

function createSchemaValidator (Schema, ChildSchema = {}) {

  if (!_.isPlainObject(Schema)) {
    throw new TypeError('Schema must be an object')
  }
  if (!_.isPlainObject(ChildSchema)) {
    throw new TypeError('ChildSchema must be an object')
  }

  const schema = _.extend({}, Schema, ChildSchema)

  return async function createValidator (values, options) {

    const context = {
      schema,
      values,
    }

    return await validate(values, context, options)
  }
}

export default createSchemaValidator
