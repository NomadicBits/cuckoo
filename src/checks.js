import _ from 'lodash'
import check from 'check-types'
import * as error from './errors'

export function isPresent (message) {
  return function validateIsPresent (value) {
    const notPresent = _.isUndefined(value)
    if (notPresent) {
      throw new error.IsPresentError(message)
    }
    return true
  }
}

function isEmpty(value) {
  return (value === undefined || value === null || value == '')
}

export function isNumber (message) {
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
