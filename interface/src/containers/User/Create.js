import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Container, Row, Col } from '../../components/Grid'
import Button from '../../components/Button'
import Header from '../../components/Header'
import UserForm from './Form'
import { users } from '../../redux/actions'
import { USER } from '../../redux/constants/actionTypes'
import './User.css'

function Create() {
  const dispatch = useDispatch()
  const [redirectPath, setRedirectPath] = useState('')
  const [fields, setFields] = useState({
    name: '',
    group: 'USER',
    state: 'ACTIVE',
  })

  function handleChange(field) {
    setFields({
      ...fields,
      [field.id]: field.value,
    })
  }

  async function handleSubmit() {
    const response = await users.create(fields)(dispatch)
    if (response.type === USER.CREATE.SUCCESS) {
      setRedirectPath('/' + response.payload.id)
    }
  }

  if (redirectPath) {
    return <Redirect to={redirectPath} />
  }

  return (
    <Container>
      <Row>
        <Col>
          <Header title="Create" />
        </Col>
      </Row>
      <UserForm
        name={fields.name}
        group={fields.group}
        state={fields.state}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div className="Form__Group">
          <Button type="submit">
            Submit
          </Button>
        </div>
      </UserForm>
      <div className="Text-Center Section">
        <Link to="/" className="Link">
          Home
        </Link>
      </div>
    </Container>
  )
}

export default Create
