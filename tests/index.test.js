import * as lib from '../src'
import { ML } from '../src/ml'

jest.mock('react-redux', () => ({
  connect: jest.fn()
}))

describe('test index', () => {
  test('should export class', () => {
    expect(typeof lib).toBe('object')
    expect(lib.ML).toBe(ML)
  })
})
