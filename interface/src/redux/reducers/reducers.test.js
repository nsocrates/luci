import usersReducer from './users'
import { USER } from '../constants/actionTypes'

describe('users reducer', () => {
  const mockUser = {
    id: 1,
    name: 'Max',
    group: 'ENGINEERING',
    state: 'ACTIVE',
  }

  it('returns the initial state', () => {
    const initialState = []
    const response = usersReducer(undefined, {})
    expect(response).toEqual(initialState)
  })

  it('handles list success', () => {
    const initialState = []
    const action = {
      payload: [mockUser],
      type: USER.LIST.SUCCESS,
    }
    const response = usersReducer(initialState, action)

    expect(response).toEqual([mockUser])
  })

  it('adds a new user', () => {
    const action = {
      payload: mockUser,
      type: USER.SHOW.SUCCESS,
    }

    const initialState = [
      {
        id: 4,
        name: 'Andy',
        group: 'USER',
        state: 'ACTIVE',
      },
    ]

    const response = usersReducer(initialState, action)
    const user = response.filter(res => res.id === mockUser.id)

    expect(user).toEqual([mockUser])
  })

  it('modifies a current user', () => {
    const updatedUser = {
      id: 1,
      name: 'Sarah',
      group: 'USER',
      state: 'INACTIVE',
    }
    const action = {
      type: USER.UPDATE.SUCCESS,
      payload: updatedUser,
    }

    const response = usersReducer([mockUser], action)
    const [user] = response

    expect(user).toEqual(updatedUser)
  })

  it('deletes the user', () => {
    const initialState = [mockUser]
    const idToDelete = mockUser.id
    const action = {
      type: USER.DESTROY.SUCCESS,
      payload: { id: idToDelete },
    }
    const response = usersReducer(initialState, action)
    const index = response.indexOf(idToDelete)

    expect(index).toBe(-1)
  })
})
