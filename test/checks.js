import test from 'ava'
import { check, error } from '../src'

async function passValidator (t, validator, value) {
  try {
    await validator(value)
    t.pass()
  } catch (e) {
    t.fail()
  }
}

async function failValidator (t, validator, value) {
  try {
    await validator(value)
    t.fail()
  } catch (e) {
    t.pass()
  }
}

/**
 * isNumber
 **/
const numberValidator = check.isNumber()

test('isNumber - should validate integer', async t => {
  await passValidator(t, numberValidator, 1)
})

test('isNumber - should validate stringified integer', async t => {
  await passValidator(t, numberValidator, '1')
})

test('isNumber - should validate float', async t => {
  await passValidator(t, numberValidator, 1.2)
})

test('isNumber - should validate stringified float', async t => {
  await passValidator(t, numberValidator, '1.2')
})

test('isNumber - should not validate non-number', async t => {
  await failValidator(t, numberValidator, 'e')
})

/**
 * isInteger
 **/
const integerValidator = check.isInteger()

test('isInteger - should validate integer', async t => {
  await passValidator(t, integerValidator, 1)
})

test('isInteger - should validate stringified integer', async t => {
  await passValidator(t, integerValidator, '1')
})

test('isInteger - should not validate float', async t => {
  await failValidator(t, integerValidator, 1.2)
})

test('isInteger - should validate stringified float', async t => {
  await failValidator(t, integerValidator, '1.2')
})

test('isInteger - should not validate non-number', async t => {
  await failValidator(t, integerValidator, 'e')
})

/**
 * isGreater
 **/
test('isGreater - should validate 2 > 1', async t => {
  await passValidator(t, check.isGreater(1), 2)
})

test('isGreater - should not validate 1 > 2', async t => {
  await failValidator(t, check.isGreater(2), 1)
})

/**
 * isNotNull
 **/
const isNotNullValidator = check.isNotNull()

test('isNotNull - should validate, value not null', async t => {
  await passValidator(t, isNotNullValidator, 'testing')
})

test('isGreater - should not validate, value is null', async t => {
  await failValidator(t, isNotNullValidator, null)
})

/**
 * isNotNullOrEmpty
 **/
const isNotNullOrEmptyValidator = check.isNotNullOrEmpty()

test('isNotNullOrEmpty - should validate, value not null or empty', async t => {
  await passValidator(t, isNotNullOrEmptyValidator, 'testing')
})

test('isNotNullOrEmpty - should not validate, value is null', async t => {
  await failValidator(t, isNotNullOrEmptyValidator, null)
})

test('isNotNullOrEmpty - should not validate, value is empty', async t => {
  await failValidator(t, isNotNullOrEmptyValidator, '')
})

/**
 * isEmail
 */
const isEmailValidator = check.isEmail()

test('isEmail - should validate, value a valid email', async t => {
  await passValidator(t, isEmailValidator, 'testing@email.com')
})

test('isEmail - should not validate, value not a valid email', async t => {
  await failValidator(t, isEmailValidator, 'testing@email')
})

/**
 * isUUID
 */
const isUUIDValidator = check.isUUID()

test('isUUID - should validate, value a valid UUID', async t => {
  await passValidator(t, isUUIDValidator, '25534abb-bcdf-4730-999b-58158a03c906')
})

test('isUUID - should NOT validate, value NOT a valid UUID', async t => {
  await failValidator(t, isUUIDValidator, '5534abb-bcdf-4730-999b-58158a03c906')
})

test('isUUID - should NOT validate, value NOT a valid UUID', async t => {
  await failValidator(t, isUUIDValidator, '25534abb-bcdT-4730-999b-58158a03c906')
})

/**
 * isOneOf
 */
const isOneOfvalidator = check.isOneOf(['element1', 'element2', 'element3'])

test('isOneOf - should validate, value is contained in list', async t => {
  await passValidator(t, isOneOfvalidator, 'element2')
})

test('isOneOf - should NOT validate, value is not contained in list', async t => {
  await failValidator(t, isOneOfvalidator, 'element123')
})

/**
 * isArray
 */
const isArrayValidator = check.isArray()

test('isArray - should validate, value is an array', async t => {
  await passValidator(t, isArrayValidator, ['test1', 'test2'])
})

test('isArray - should NOT validate, value is not an array', async t => {
  await failValidator(t, isArrayValidator, 'test1')
})

/**
 * hasLength
 */
const hasLengthValidator = check.hasLength(5)

test('hasLength - should validate, string length is equal to 5', async t => {
  await passValidator(t, hasLengthValidator, 'abcde')
})

test('hasLength - should validate, string length is longer than 5', async t => {
  await passValidator(t, hasLengthValidator, 'abcdefgh')
})

test('hasLength - should NOT validate, length is less than 5', async t => {
  await failValidator(t, hasLengthValidator, 'abcd')
})

/**
 * isMatch
 */
const isMatchValidator = check.isMatch(/^[0-5]{5}$/)

test('isMatchValidator - should validate, value matches regex', async t => {
  await passValidator(t, isMatchValidator, '12345')
})

test('isMatchValidator - should NOT validate, value does not match regex', async t => {
  await failValidator(t, isMatchValidator, '12349')
})
