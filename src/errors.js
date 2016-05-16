import createError from 'create-error'

export const ValidationError = createError('ValidationError')

export const IsPresentError = createError(ValidationError, 'IsPresentError', {
  code: '1000',
  message: 'Can not be empty',
})
