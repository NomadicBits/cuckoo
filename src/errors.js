import createError from 'create-error'

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
  message: 'Must be lower than provided value',
})
