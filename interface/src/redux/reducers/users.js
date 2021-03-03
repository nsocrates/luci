import actionTypes from '../constants/actionTypes'

const { USER } = actionTypes
const initialState = []

function mergeUser(state, user) {
  if (!Object.keys(user).length || !user) {
    console.error('User is either not an object or is empty')
    return state
  }

  const stateIds = state.map(user => user.id)
  const userIndex = stateIds.indexOf(user.id)

  if (userIndex === -1) {
    return [...state, ...[user]]
  }

  return state.reduce((acc, cur) => {
    if (cur.id === user.id) {
      return acc.concat({ ...cur, ...user })
    }

    return acc.concat(cur)
  }, [])
}

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USER.LIST.SUCCESS:
      const ids = state.map(user => user.id)
      const uniqueUsers = action.payload.filter(
        user => ids.indexOf(user.id) === -1
      )
      return [...state, ...uniqueUsers]
    case USER.SHOW.SUCCESS:
      return mergeUser(state, action.payload)
    case USER.UPDATE.SUCCESS:
      return mergeUser(state, action.payload)
    case USER.DESTROY.SUCCESS:
      const shallowState = [...state]
      const { id } = action
      const index = shallowState.indexOf(id)
      shallowState.splice(index, 1)
      return shallowState
    default:
      return state
  }
}

export default usersReducer
