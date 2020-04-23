import { ML } from '../../src/ml'

jest.mock('react-redux', () => ({
  connect: jest.fn()
}))

describe('test mapDispatchToProps', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should be equal to actions', () => {
    const ml = new ML('moduleName')
    const { actions, mapDispatchToProps } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof mapDispatchToProps).toBe('object')
    expect(mapDispatchToProps).toBe(actions)
  })
})
