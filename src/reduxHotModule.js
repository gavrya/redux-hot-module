import { connect } from 'react-redux'
import { toConst, startsWith, hasOwnProp, mergeProps, addAction } from './utils'

class ReduxHotModule {
  constructor(module, preloadedState = null) {
    this.module = module
    this.preloadedState = preloadedState
    this.actionsRepo = {}
  }

  addParamAction(name, defaultValue = null) {
    addAction(this.actionsRepo, name, { isParam: true, defaultValue })
  }

  addParamsAction(name, defaultValue = {}) {
    addAction(this.actionsRepo, name, {
      isParams: true,
      defaultValue,
      keys: Object.keys(defaultValue)
    })
  }

  addEventAction(name, defaultValue = null) {
    addAction(this.actionsRepo, name, { isEvent: true, defaultValue })
  }

  addResetAction(name = 'reset', keys = []) {
    addAction(this.actionsRepo, name, { isReset: true, keys })
  }

  create() {
    const types = {}
    const actions = {}
    const paramTypes = {}
    const paramsTypes = {}
    const resetTypes = {}
    const defaultState = {}
    const namespace = `@@${this.module}`
    const moduleConst = toConst(this.module)
    const typePrefix = `${namespace}/`
    const items = Object.values(this.actionsRepo)
    const { length } = items

    for (let i = 0; i < length; i += 1) {
      const { name, meta } = items[i]
      const { defaultValue } = meta
      const typeNameConst = toConst(name)
      const type = `${typePrefix}${typeNameConst}`
      const typeName = `${moduleConst}_${typeNameConst}`
      const actionName = `${name}Action`

      types[typeName] = type

      if (meta.isParam) {
        actions[actionName] = (value = defaultValue) => ({ type, payload: { [name]: value } })
        defaultState[name] = defaultValue
        paramTypes[type] = meta
      } else if (meta.isParams) {
        actions[actionName] = (value = {}) => ({ type, payload: { ...defaultValue, ...value } })
        paramsTypes[type] = meta
      } else if (meta.isEvent) {
        actions[actionName] = (value = defaultValue) => ({ type, payload: value })
      } else {
        actions[actionName] = () => ({ type })
        resetTypes[type] = meta
      }
    }

    const initialState = mergeProps(defaultState, this.preloadedState)

    const reducer = (state = initialState, action) => {
      const { type } = action

      if (!startsWith(type, typePrefix)) {
        return state
      }

      if (hasOwnProp(paramTypes, type)) {
        return { ...state, ...action.payload }
      }

      if (hasOwnProp(paramsTypes, type)) {
        const { keys } = paramsTypes[type]

        return mergeProps(state, action.payload, keys)
      }

      if (hasOwnProp(resetTypes, type)) {
        const { keys } = resetTypes[type]

        return keys.length ? mergeProps(state, defaultState, keys) : defaultState
      }

      return state
    }

    Object.freeze(types)
    Object.freeze(actions)
    Object.freeze(defaultState)
    Object.freeze(initialState)

    const mapStateToProps = (state) => state[namespace]
    const mapDispatchToProps = actions
    const withModuleProps = connect(mapStateToProps, mapDispatchToProps)

    return {
      namespace,
      types,
      actions,
      reducer,
      defaultState,
      initialState,
      withModuleProps,
      mapStateToProps,
      mapDispatchToProps
    }
  }
}

export { ReduxHotModule }
