import test from 'ava'
import * as check from '../src/checks'
import * as error from '../src/errors'
import { createSchemaValidator } from '../src'

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
  t.true(result)
})

test('should not validate', async t => {
  const result = await validator({ name: undefined })
  t.not(true)
})

test('should respect whitelist true option', async t => {
  const result = await validator({ bad: 'data' }, { whitelist: true })
  t.true(result.bad.validateWhitelist === 'Property not allowed')
})

test('should respect whitelist false option', async t => {
  const result = await validator({ bad: 'data' }, { whitelist: false })
  t.true(result)
})

test('should default to whitelist true', async t => {
  const result = await validator({ bad: 'data' })
  t.true(result.bad.validateWhitelist === 'Property not allowed')
})
