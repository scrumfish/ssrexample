import React from 'react'
import ReactDOM from 'react-dom';
import {Router, Switch, Route } from 'react-router-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import Home from './Home'
import Blog from './Blog'

const App = (props) => {
  const {url} = {...props}
  const history = typeof window === 'undefined'
    ? createMemoryHistory()
    : createBrowserHistory()

  return (
    <Router basename='/' url={url} history={history}>
      <Switch>
        <Route path='/blog/:id?' render={() => <Blog {...props} />} />
        <Route exact path='/' render={() => <Home {...props} />} />
      </Switch>
    </Router>
  )
}

export default App
