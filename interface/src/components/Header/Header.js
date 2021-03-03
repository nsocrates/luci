import Navigation from '../Navigation'
import './Header.css'

function Header({ title }) {
  return (
    <header className="Site-Header">
      <h1 className="Site-Header__Title">{title}</h1>
      <Navigation />
    </header>
  )
}

export default Header
