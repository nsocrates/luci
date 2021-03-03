import { useState } from 'react'
import './User.css'

function Form(props) {
  const [nameErrorMessage, setNameError] = useState('')

  function handleChange(e) {
    e.preventDefault()
    const id = e.currentTarget.id
    const value = e.target.value

    if (id === 'name' && value) {
      setNameError('')
    }

    props.onChange({ id, value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { name } = props
    if (name) {
      props.onSubmit()
    } else {
      setNameError('Name cannot be blank')
    }
  }

  const nameInputClassName = nameErrorMessage
    ? 'Form__Control Form__Control--error'
    : 'Form__Control'

  return (
    <form data-testid="form" onSubmit={handleSubmit} className="Form">
      <div className="Form__Group">
        <label htmlFor="name" className="Form__Label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className={nameInputClassName}
          value={props.name}
          onChange={handleChange}
        />
        <small className="Form__Error-Message">{nameErrorMessage}</small>
      </div>

      <div className="Form__Group">
        <label htmlFor="group" className="Form__Label">
          Group
        </label>
        <select
          id="group"
          className="Form__Control"
          value={props.group}
          onChange={handleChange}
        >
          <option value="USER">User</option>
          <option value="MARKETING">Marketing</option>
          <option value="ENGINEERING">Engineering</option>
        </select>
      </div>

      <div className="Form__Group">
        <label htmlFor="state" className="Form__Label">
          State
        </label>
        <select
          id="state"
          className="Form__Control"
          value={props.state}
          onChange={handleChange}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>
      {props.children}
    </form>
  )
}

export default Form
