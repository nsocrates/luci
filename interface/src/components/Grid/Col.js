import './Grid.css'

function Col({ children, size = {} }) {
  const colClassNames = Object.keys(size)
    .reduce((acc, cur) => {
      const className = `Col--${cur}-${size[cur]}`
      return acc + ' ' + className
    }, 'Col')
    .trim()

  return <div className={colClassNames}>{children}</div>
}

export default Col
