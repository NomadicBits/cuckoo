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

export function isNotNull (message) {
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

export function isUUID (message) {
  return function validateIsUUID (value) {
    if (isEmpty(value)) {
      return true
    }
    if (!value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      throw new error.IsUUIDError(message)
    }
    return true
  }
}

export function isOneOf (list, message) {
  return function validateIsOneOf (value) {
    if (isEmpty(value)) {
      return true
    }
    if (list.indexOf(value) === -1) {
      throw new error.IsOneOfError(message, { value: list.join() })
    }
    return true
  }
}

export function isArray (message) {
  return function validateIsArray (value) {
    if (isEmpty(value)) {
      return true
    }
    if (!Array.isArray(value)) {
      throw new error.IsArrayError(message)
    }
    return true
  }
}

export function hasLength (length, message) {
  return function validateHasLength (value) {
    if (isEmpty(value)) {
      return true
    }
    if (value.toString().length < length) {
      throw new error.HasLengthError(message, { value: length })
    }
    return true
  }
}

export function isMatch (regEx, message) {
  return function validateIsMatch (value) {
    if (isEmpty(value)) {
      return true
    }
    try {
      if (!value.toString().match(regEx)) {
        throw new error.IsMatchError(message, { value: regEx.toString() })
      }
    } catch (error) {
      console.log(error)
      throw error
    }
    return true
  }
}
