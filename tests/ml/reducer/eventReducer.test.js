import { ML } from '../../../src/ml'

jest.mock('react-redux', () => ({
  connect: jest.fn()
}))

describe('test event reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should always return passed state', () => {
    const ml = new ML('moduleName')

    ml.addEventAction('readyEvent')

    const { actions, reducer } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof reducer).toBe('function')

    const { readyEventAction } = actions
    const state = {}

    expect(reducer(state, readyEventAction())).toBe(state)
  })
})
