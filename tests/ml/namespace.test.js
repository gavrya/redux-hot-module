import { ML } from '../../src/ml'

jest.mock('react-redux', () => ({
  connect: jest.fn()
}))

describe('test namespace', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return expected module namespace', () => {
    const moduleName = 'moduleName'

    const ml = new ML(moduleName)
    const { namespace } = ml.create()

    expect(typeof namespace).toBe('string')
    expect(namespace).toBe(`@@${moduleName}`)
  })

  test('should throw an error when used non-string module namespace', () => {
    expect(() => new ML().create()).toThrow(TypeError)
    expect(() => new ML(null).create()).toThrow(TypeError)
    expect(() => new ML(undefined).create()).toThrow(TypeError)
    expect(() => new ML(true).create()).toThrow(TypeError)
  })
})
