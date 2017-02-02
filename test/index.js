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
  optionalCount: [
    check.isNumber(),
    check.isGreater(6),
  ],
  notNullCount: [
    check.isNotNull(),
    check.isNumber(),
    check.isGreater(6),
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

test('should not validate, count not present', async t => {
  const result = await validator({ optionalCount: 7 })
  t.true(result.hasErrors)
})

test('should validate', async t => {
  const result = await validator({ count: 4 })
  t.false(result.hasErrors)
})

test('should validate, present but null value', async t => {
  const result = await validator({ count: null })
  t.false(result.hasErrors)
})

test('should not validate', async t => {
  const result = await validator({ count: 3 })
  t.true(result.hasErrors)
})

test('should validate, optionalCount present but null', async t => {
  const result = await validator({ count: 4, optionalCount: null })
  t.false(result.hasErrors)
})

test('should not validate, optionalCount not a number', async t => {
  const result = await validator({ count: 4, optionalCount: 'nope' })
  t.true(result.hasErrors)
})

test('should not validate, optionalCount below 6', async t => {
  const result = await validator({ count: 4, optionalCount: 5 })
  t.true(result.hasErrors)
})

test('should not validate, notNullCount present but null', async t => {
  const result = await validator({ count: 4, notNullCount: null })
  t.true(result.hasErrors)
})

test('should validate, notNullCount present and not null', async t => {
  const result = await validator({ count: 4, notNullCount: 12 })
  t.false(result.hasErrors)
})

test('should not validate if property is undefined', async t => {
  const result = await validator({ count: undefined })
  t.true(result.hasErrors
    && result.errors.count[0] instanceof error.IsPresentError
  )
})

test('should default to break early', async t => {
  const result = await validator({ count: 'wat?' })
  t.true(result.hasErrors
    && result.errors.count[0] instanceof error.IsNumberError
  )
})

test('should respect breakEarly true option', async t => {
  const result = await validator({ count: 'wat?' }, { breakEarly: true })
  t.true(result.hasErrors
    && result.errors.count[0] instanceof error.IsNumberError
  )
})

test('should respect breakEarly false option', async t => {
  const result = await validator({ count: 'wat?' }, { breakEarly: false })
  t.true(result.hasErrors
    && (result.errors.count[0] instanceof error.IsNumberError)
    && (result.errors.count[1] instanceof error.IsGreaterError)
  )
})

test('should respect whitelist true option', async t => {
  const result = await validator({ bad: 'data' }, { whitelist: true })
  t.true(result.hasErrors
    && result.errors.bad[0] instanceof error.IsWhitelistError
  )
})

test('should respect whitelist false option', async t => {
  const result = await validator({ count: 4, optionalCount: null, bad: 'data' }, { whitelist: false })
  t.false(result.hasErrors)
})

test('should default to whitelist true', async t => {
  const result = await validator({ count: 4, optionalCount: null, bad: 'data' })
  t.true(result.hasErrors
    && result.errors.bad[0] instanceof error.IsWhitelistError
  )
})

test('should remove unknown property bad', async t => {
  const result = await validator({ count: 4, optionalCount: null, bad: 'data' }, { whitelist: false, removeUnknown: true })
  t.true(!result.hasErrors && result.values.bad === undefined)
})

test('should keep unknown property bad', async t => {
  const result = await validator({ count: 4, optionalCount: null, bad: 'data' }, { whitelist: false, removeUnknown: false })
  t.true(!result.hasErrors && result.values.bad !== undefined)
})
