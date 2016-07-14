import _ from 'lodash'
import createError from '@corelate/create-error'

export const ValidationError = createError('ValidationError')

export const IsWhitelistError = createError(ValidationError, 'IsWhitelistError', {
  code: '1000',
  message: 'Property not allowed',
})

export const IsPresentError = createError(ValidationError, 'IsPresentError', {
  code: '1001',
  message: 'Can not be empty',
})

export const IsNumberError = createError(ValidationError, 'IsNumberError', {
  code: '1002',
  message: 'Must be a number',
})

export const IsIntegerError = createError(ValidationError, 'IsIntegerError', {
  code: '1003',
  message: 'Must be an integer',
})

export const IsGreaterError = createError(ValidationError, 'IsGreaterError', {
  code: '1004',
  message: 'Must be lower than <%= value %>',
})

export const IsNotNullError = createError(ValidationError, 'IsNotNullError', {
  code: '1005',
  message: 'Must not be null',
})

export const IsEmailError = createError(ValidationError, 'IsEmailError', {
  code: '1006',
  message: 'Must be a valid email',
})

export const IsUUIDError = createError(ValidationError, 'IsUUIDError', {
  code: '1007',
  message: 'Must be a valid UUID',
})

export const IsOneOfError = createError(ValidationError, 'IsOneOfError', {
  code: '1008',
  message: 'Must be one of the following values (<%= value %>)',
})
