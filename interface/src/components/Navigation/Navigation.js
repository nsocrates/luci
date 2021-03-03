import { Link } from 'react-router-dom'
import LINKS from '../../redux/constants/links'
import './Navigation.css'

function Navigation() {
  const linksMarkup = LINKS.map(link => (
    <li className="Nav__List-Item" key={link.title}>
      <Link to={link.url} className="Nav__Link">
        {link.title}
      </Link>
    </li>
  ))

  return (
    <nav className="Nav">
      <ul className="Nav__List">{linksMarkup}</ul>
    </nav>
  )
}

export default Navigation
