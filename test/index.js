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
  name: [
    check.isPresent(),
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
  const result = await validator({
    name: 'Some Name',
  })
  t.true(result)
})

test('should not validate', async t => {
  const result = await validator({ name: undefined })
  t.not(true)
})
