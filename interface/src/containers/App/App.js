// This is the App container
import * as User from '../User'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <main className="App">
        <Switch>
          <Route exact path="/">
            <User.List />
          </Route>
          <Route exact path="/new">
            <User.Create />
          </Route>
          <Route exact path="/:id">
            <User.Show />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App
