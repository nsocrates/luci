import { Link } from 'react-router-dom'
import CardItem from './CardItem'
import { Row, Col } from '../Grid'
import './Cards.css'

function Cards({ users }) {
  const cardItems = users.map(user => {
    return (
      <Col size={{ md: 'one-half', lg: 'one-fourth' }} key={user.id}>
        <Link to={`/${user.id}`} className="Card__Link">
          <CardItem user={user} />
        </Link>
      </Col>
    )
  })

  return (
    <Row>
      {cardItems}
    </Row>
  )
}

export default Cards
