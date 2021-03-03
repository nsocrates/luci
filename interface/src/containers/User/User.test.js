import { render, fireEvent, screen } from '../../utils/test-utils'
import * as User from './index'

describe('users list', () => {
  it('should load with preloaded state', () => {
    const initialState = {
      users: [
        {
          id: 1,
          name: 'Sarah',
          group: 'MARKETING',
          state: 'ACTIVE',
        },
      ],
    }
    render(<User.List />, { initialState })
    expect(screen.getByText('Sarah')).toBeInTheDocument()
  })
})

describe('user form', () => {
  function setup() {
    const props = {
      name: 'Sarah',
      group: 'MARKETING',
      state: 'ACTIVE',
      onChange: jest.fn(),
      onSubmit: jest.fn(),
    }

    const utils = render(<User.Form {...props} />)
    const form = utils.getByTestId('form')
    const nameInput = utils.getByLabelText('Name')
    const groupInput = utils.getByLabelText('Group')
    const stateInput = utils.getByLabelText('State')

    return {
      ...utils,
      form,
      nameInput,
      groupInput,
      stateInput,
      onChange: props.onChange,
      onSubmit: props.onSubmit,
    }
  }

  it('renders all fields', () => {
    setup()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Group')).toBeInTheDocument()
    expect(screen.getByText('State')).toBeInTheDocument()
  })

  it('calls the appropriate handler on change', () => {
    const { nameInput, groupInput, stateInput, onChange } = setup()
    fireEvent.change(nameInput, { target: { value: 'Steven' } })
    fireEvent.change(groupInput, { target: { value: 'USER' } })
    fireEvent.change(stateInput, { target: { value: 'INACTIVE' } })

    expect(onChange).toBeCalled()
  })

  it('calls the appropriate handler on submit', () => {
    const { form, onSubmit } = setup()
    fireEvent.submit(form)
    expect(onSubmit).toBeCalledTimes(1)
  })
})
