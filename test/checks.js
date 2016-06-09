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
