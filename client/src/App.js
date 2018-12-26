import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import Routes from './Routes'
import AuthStore from './stores/auth-store'
import 'bulma/css/bulma.css'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    const authStore = new AuthStore()
    this.authStore = authStore

    // expose store during tests
    if (window.Cypress) {
      window.__authStore__ = authStore
    }
  }

  render () {
    return (
      <div>
        <Router>
          <Provider authStore={this.authStore}>
            <Routes />
          </Provider>
        </Router>
      </div>
    )
  }
}

export default observer(App)
