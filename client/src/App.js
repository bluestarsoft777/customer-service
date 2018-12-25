import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import HomePage from './Home'
import ProfilePage from './ProfilePage'
import AboutPage from './AboutPage'
import AuthCallback from './AuthCallback'
import NotFoundPage from './NotFoundPage'
import Header from './common/Header'
import AuthStore from './stores/auth-store'
import { CustomerServicePage, CustomerPage } from './CustomerService'
import Loader from './common/Loader'
import 'bulma/css/bulma.css'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.authStore = new AuthStore()
  }

  render () {
    return (
      <div>
        <Router>
          <Provider authStore={this.authStore}>
            {this.authStore.loading
              ? <Loader />
              : <AppRoutes />}
          </Provider>
        </Router>
      </div>
    )
  }
}

const AppRoutes = () => {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/customer-service' component={CustomerServicePage} />
        <Route exact path='/customer-service/:customerId' component={CustomerPage} />
        <Route exact path='/callback' component={AuthCallback} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/about' component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}

export default observer(App)
