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

export function isNumber (message) {
  return function validateIsNumber (value) {
    const number = Number(value)
    if (!check.number(number)) {
      throw new error.ValidationError(message)
    }
    return true
  }
}

export function isInteger (message) {
  return function validateIsInteger (value) {
    const integer = Number(value)
    if (!check.integer(integer)) {
      throw new error.ValidationError(message)
    }
    return true
  }
}

export function isGreater (than, message) {
  return function validateIsGreater (value) {
    const number = Number(value)
    if (!check.greater(number, than)) {
      throw new error.ValidationError(message)
    }
    return true
  }
}
