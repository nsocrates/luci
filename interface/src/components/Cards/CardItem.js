import './Cards.css'

function CardItem(props) {
  function capitalize(str) {
    const firstChar = str[0].toUpperCase()
    const remainingChars = str.slice(1).toLowerCase()
    return firstChar + remainingChars
  }

  const stateClassName = props.user.state === 'INACTIVE' ? 'Text-Light' : null

  return (
    <div className="Card__Item">
      <div className="Card__Body">
        <h2>{props.user.name}</h2>
        <h4>{capitalize(props.user.group)}</h4>
        <h4 className={stateClassName}>{props.user.state}</h4>
      </div>
    </div>
  )
}

export default CardItem
