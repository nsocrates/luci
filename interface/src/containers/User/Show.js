import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, Redirect } from 'react-router-dom'
import { Container, Row, Col } from '../../components/Grid'
import Button from '../../components/Button'
import Header from '../../components/Header'
import UserForm from './Form'
import { users } from '../../redux/actions'
import { USER } from '../../redux/constants/actionTypes'
import './User.css'

function Show() {
  const dispatch = useDispatch()
  const id = Number(useParams().id)
  const user = useSelector(state => {
    const userIds = state.users.map(user => user.id)
    const index = userIds.indexOf(id)
    return state.users[index] || {}
  })
  const isShowing = useSelector(state => state.requests.users.isShowing)

  const [redirectPath, setRedirectPath] = useState('')
  const [fields, setFields] = useState({
    name: '',
    group: '',
    state: '',
  })

  useEffect(() => {
    if (!Object.keys(user).length && !isShowing) {
      setRedirectPath('/')
    }
  }, [user, isShowing])

  useEffect(() => {
    users.show(id)(dispatch)
  }, [dispatch, id])

  useEffect(() => {
    setFields({
      name: user.name || '',
      group: user.group || '',
      state: user.state || '',
    })
  }, [user])

  function handleSubmit() {
    users.update({ id, data: fields })(dispatch)
  }

  async function handleDelete(e) {
    e.preventDefault()
    const response = await users.destroy(id)(dispatch)
    if (response.type === USER.DESTROY.SUCCESS) {
      setRedirectPath('/')
    }
  }

  function handleChange(field) {
    setFields({
      ...fields,
      [field.id]: field.value,
    })
  }

  if (redirectPath) {
    return <Redirect to={redirectPath} />
  }

  return (
    <Container>
      <Row>
        <Col>
          <Header title={`Showing ${user.name}`} />
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
          <div className="Form__Button-Group Form__Button-Group--space-between">
            <Button type="submit">
              Submit
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
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

export default Show
