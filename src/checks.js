import _ from 'lodash'
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
