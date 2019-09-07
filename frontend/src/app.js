import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'

import Home from './components/pages/Home'
import Index from './components/recipes/Index'
import Show from './components/recipes/Show'
import New from './components/recipes/New'
import Edit from './components/recipes/Edit'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>

        <Navbar />

        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <SecureRoute path='/recipes/new' component={New} />
          <SecureRoute path='/recipes/:id/edit' component={Edit} />
          <SecureRoute path='/recipes/:id' component={Show} />
          <Route path='/recipes' component={Index} />
          <Route exact path='/' component={Home} />
        </Switch>

      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
