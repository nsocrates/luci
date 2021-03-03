import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import user from '../../redux/actions/users'
import Cards from '../../components/Cards'
import Header from '../../components/Header'
import { IconLoading } from '../../components/Icons'
import { Container, Row, Col } from '../../components/Grid'

function List() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const isListing = useSelector(state => state.requests.users.isListing)

  useEffect(() => {
    user.list()(dispatch)
  }, [dispatch])

  const headerMarkup = (
    <Row>
      <Col>
        <Header title="Home" />
      </Col>
    </Row>
  )

  const loaderMarkup =
    isListing && !users.length ? (
      <div className="Fixed-Center">
        <IconLoading color={'#413f3e'} size={'40px'} />
      </div>
    ) : null

  const noUsersMarkup = !users.length && !isListing ? (
    <div className="Fixed-Center">
      <p className="Display-5 Text-Light" style={{ marginBottom: 0 }}>
        No users to display
      </p>
    </div>
  ) : null

  const moreUsersMarkup =
    users.length && isListing ? (
      <div className="Section">
        <div className="Flex-Center">
          <IconLoading color={'#413f3e'} size={'40px'} />
        </div>
      </div>
    ) : null

  const cardsMarkup = users.length ? <Cards users={users} /> : null

  return (
    <Container>
      {headerMarkup}
      {noUsersMarkup}
      {loaderMarkup}
      {cardsMarkup}
      {moreUsersMarkup}
    </Container>
  )
}

export default List
