import './User.css'

function Form(props) {
  function handleChange(e) {
    e.preventDefault()
    const id = e.currentTarget.id
    const value = e.target.value
    props.onChange({ id, value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit()
  }

  return (
    <form data-testid="form" onSubmit={handleSubmit} className="Form">
      <div className="Form__Group">
        <label htmlFor="name" className="Form__Label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="Form__Control"
          value={props.name}
          onChange={handleChange}
        />
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
