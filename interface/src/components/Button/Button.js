import './Button.css'

function Button({ onClick, children, className = '', ...rest }) {
  const classNames = ('Btn ' + className).trim()
  return (
    <button className={classNames} onClick={onClick} { ...rest }>
      {children}
    </button>
  )
}

export default Button
