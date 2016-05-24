import test from 'ava'
import { createSchemaValidator, check, error } from '../src'

test('expect Schema to be an object', async t => {
  try {
    createSchemaValidator()
  } catch (e) {
    return t.pass()
  }
  t.fail('expected Error')
})

const TestSchema = {
  count: [
    check.isPresent(),
    check.isNumber(),
    check.isGreater(3),
  ],
}

const validator = createSchemaValidator(TestSchema)

test('expect values to be an object', async t => {
  try {
    await validator()
  } catch (e) {
    return t.pass()
  }
  t.fail('expected Error')
})

test('should validate', async t => {
  const result = await validator({ count: 4 })
  t.false(result.hasErrors)
})

test('should not validate', async t => {
  const result = await validator({ count: 3 })
  t.true(result.hasErrors)
})

test('should not validate if property is undefined', async t => {
  const result = await validator({ count: undefined })
  t.true(result.hasErrors
    && result.errors.count.validateIsPresent instanceof error.IsPresentError
  )
})

test('should default to break early', async t => {
  const result = await validator({ count: 'wat?' })
  t.true(result.hasErrors
    && result.errors.count.validateIsNumber instanceof error.IsNumberError
  )
})

test('should respect breakEarly true option', async t => {
  const result = await validator({ count: 'wat?' }, { breakEarly: true })
  t.true(result.hasErrors
    && result.errors.count.validateIsNumber instanceof error.IsNumberError
  )
})

test('should respect breakEarly false option', async t => {
  const result = await validator({ count: 'wat?' }, { breakEarly: false })
  t.true(result.hasErrors
    && (result.errors.count.validateIsNumber instanceof error.IsNumberError)
    && (result.errors.count.validateIsGreater instanceof error.IsGreaterError)
  )
})

test('should respect whitelist true option', async t => {
  const result = await validator({ bad: 'data' }, { whitelist: true })
  t.true(result.hasErrors
    && result.errors.bad.validateWhitelist instanceof error.IsWhitelistError
  )
})

test('should respect whitelist false option', async t => {
  const result = await validator({ bad: 'data' }, { whitelist: false })
  t.false(result.hasErrors)
})

test('should default to whitelist true', async t => {
  const result = await validator({ bad: 'data' })
  t.true(result.hasErrors
    && result.errors.bad.validateWhitelist instanceof error.IsWhitelistError
  )
})
