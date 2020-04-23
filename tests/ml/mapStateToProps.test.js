import { ML } from '../../src/ml'

jest.mock('react-redux', () => ({
  connect: jest.fn()
}))

describe('test mapStateToProps()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return module state from redux state', () => {
    const ml = new ML('moduleName')
    const { namespace, mapStateToProps } = ml.create()

    expect(typeof namespace).toBe('string')
    expect(typeof mapStateToProps).toBe('function')

    const moduleState = {}
    const reduxState = { [namespace]: moduleState }

    expect(mapStateToProps(reduxState)).toBe(moduleState)
  })
})
