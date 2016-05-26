import _ from 'lodash'
import check from 'check-types'
import * as error from './errors'

export function isPresent (message) {
  message = message ? _.template(message) : message
  return function validateIsPresent (value) {
    const notPresent = _.isUndefined(value)
    if (notPresent) {
      throw new error.IsPresentError(message)
    }
    return true
  }
}

export function isNotNull (message) {
  message = message ? _.template(message) : message
  return function validateIsNotNull (value) {
    const number = Number(value)
    if (value === null) {
      throw new error.IsNotNullError(message)
    }
    return true
  }
}

function isEmpty (value) {
  return (value === undefined || value === null || value === '')
}

export function isNumber (message) {
  message = message ? _.template(message) : message
  return function validateIsNumber (value) {
    if (isEmpty(value)) {
      return true
    }
    const number = Number(value)
    if (!check.number(number)) {
      throw new error.IsNumberError(message)
    }
    return true
  }
}

export function isInteger (message) {
  message = message ? _.template(message) : message
  return function validateIsInteger (value) {
    if (isEmpty(value)) {
      return true
    }
    const integer = Number(value)
    if (!check.integer(integer)) {
      throw new error.IsIntegerError(message)
    }
    return true
  }
}

export function isGreater (than, message) {
  message = message ? _.template(message) : message
  return function validateIsGreater (value) {
    if (isEmpty(value)) {
      return true
    }
    const number = Number(value)
    if (!check.greater(number, than)) {
      throw new error.IsGreaterError(message, { value: than })
    }
    return true
  }
}

export function isEmail (message) {
  return function validateIsEmail (value) {
    if (isEmpty(value)) {
      return true
    }
    if (!value.match(/[^ ]+@[^ ]+\.[^ ]+/)) {
      throw new error.IsEmailError(message)
    }
    return true
  }
}
