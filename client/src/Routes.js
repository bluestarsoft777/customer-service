import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import HomePage from './Home'
import ProfilePage from './ProfilePage'
import AboutPage from './AboutPage'
import AuthCallback from './AuthCallback'
import NotFoundPage from './NotFoundPage'
import Header from './common/Header'
import { CustomerServicePage, CustomerPage } from './CustomerService'
import { AuthorizedRoute } from './common/Authorization'

class Routes extends React.Component {
  // constructor(props) {
  //   super(props)
  //   // do something else..

  // }

  render () {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/callback' component={AuthCallback} />
          <Route exact path='/about' component={AboutPage} />
          <AuthorizedRoute exact path='/customer-service' component={CustomerServicePage} />
          <AuthorizedRoute exact path='/customer-service/:customerId' component={CustomerPage} />
          <AuthorizedRoute exact path='/profile' component={ProfilePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(observer(Routes))
