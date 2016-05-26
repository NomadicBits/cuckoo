import _ from 'lodash'
import createError from '@corelate/create-error'

export const ValidationError = createError('ValidationError')

export const IsWhitelistError = createError(ValidationError, 'IsWhitelistError', {
  code: '1000',
  message: _.template('Property not allowed'),
})

export const IsPresentError = createError(ValidationError, 'IsPresentError', {
  code: '1001',
  message: _.template('Can not be empty'),
})

export const IsNumberError = createError(ValidationError, 'IsNumberError', {
  code: '1002',
  message: _.template('Must be a number'),
})

export const IsIntegerError = createError(ValidationError, 'IsIntegerError', {
  code: '1003',
  message: _.template('Must be an integer'),
})

export const IsGreaterError = createError(ValidationError, 'IsGreaterError', {
  code: '1004',
  message: _.template('Must be lower than <%= value %>'),
})

export const IsNotNullError = createError(ValidationError, 'IsNotNullError', {
  code: '1005',
  message: _.template('Must not be null'),
})

export const IsEmailError = createError(ValidationError, 'IsEmailError', {
  code: '1006',
  message: _.template('Must be a valid email'),
})
