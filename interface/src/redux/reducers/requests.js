import actionTypes from '../constants/actionTypes'

const { USER } = actionTypes
const initialState = {
  users: {
    isListing: false,
    isShowing: false,
    isUpdating: false,
    isDestroying: false,
    isCreating: false,
  },
}

function requests(state = initialState, action) {
  switch (action.type) {
    case USER.LIST.REQUEST: {
      return {
        ...state,
        users: {
          ...state.users,
          isListing: true,
        },
      }
    }

    case USER.LIST.SUCCESS:
    case USER.LIST.FAILURE: {
      return {
        ...state,
        users: {
          ...state.users,
          isListing: false,
        },
      }
    }

    case USER.SHOW.REQUEST: {
      return {
        ...state,
        users: {
          ...state.users,
          isShowing: true,
        },
      }
    }

    case USER.SHOW.SUCCESS:
    case USER.SHOW.FAILURE: {
      return {
        ...state,
        users: {
          ...state.users,
          isShowing: false,
        },
      }
    }

    case USER.CREATE.REQUEST: {
      return {
        ...state,
        users: {
          ...state.users,
          isCreating: true,
        },
      }
    }

    case USER.CREATE.SUCCESS:
    case USER.CREATE.FAILURE: {
      return {
        ...state,
        users: {
          ...state.users,
          isCreating: false,
        },
      }
    }

    case USER.UPDATE.REQUEST: {
      return {
        ...state,
        users: {
          ...state.users,
          isUpdating: true,
        },
      }
    }

    case USER.UPDATE.SUCCESS:
    case USER.UPDATE.FAILURE: {
      return {
        ...state,
        users: {
          ...state.users,
          isUpdating: false,
        },
      }
    }

    case USER.DESTROY.REQUEST: {
      return {
        ...state,
        users: {
          ...state.users,
          isDestroying: true,
        },
      }
    }

    case USER.DESTROY.SUCCESS:
    case USER.DESTROY.FAILURE: {
      return {
        ...state,
        users: {
          ...state.users,
          isDestroying: false,
        },
      }
    }

    default:
      return state
  }
}

export default requests
