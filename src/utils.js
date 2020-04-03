const clearRegex = /[\W]/g

const replaceRegex = /([a-z])([A-Z])|([a-zA-Z])([\d])|([\d])([a-zA-Z])/g

const formatReplace = (m) => `${m[0]}_${m[1]}`

const toConst = (text) =>
  text
    .replace(clearRegex, '')
    .replace(replaceRegex, formatReplace)
    .toUpperCase()

const startsWith = (string, prefix) =>
  typeof string === 'string' && string.indexOf(prefix) === 0

const hasOwnProp = (object, prop) =>
  Object.prototype.hasOwnProperty.call(object, prop)

const mergeProps = (target, source) => {
  if (!source || typeof source !== 'object') {
    return target
  }

  const state = { ...target }
  const sourceProps = Object.keys(source)
  const { length } = sourceProps

  for (let i = 0; i < length; i += 1) {
    const prop = sourceProps[i]

    if (hasOwnProp(state, prop)) {
      state[prop] = source[prop]
    }
  }

  return state
}

const addAction = (actionsRepo, name, meta) => {
  if (typeof name !== 'string') {
    throw new Error('Invalid action name.')
  }

  const trimmedName = name.trim()

  if (trimmedName === '' || trimmedName !== name) {
    throw new Error('Action name should not be empty or contain whitespace.')
  }

  const firstChar = trimmedName[0]

  if (firstChar !== firstChar.toLowerCase()) {
    throw new Error('Action name should be in camelCase.')
  }

  if (hasOwnProp(actionsRepo, name)) {
    throw new Error(`Action with the name "${name}" is already exist.`)
  }

  actionsRepo[name] = { name, meta }
}

export { toConst, startsWith, hasOwnProp, mergeProps, addAction }