import React from 'react'
import Loader from '../Loader'
import { inject, observer } from 'mobx-react'
import { Route, withRouter } from 'react-router-dom'

class AuthorizedRoute extends React.Component {
  render () {
    const { authStore, ...rest } = this.props
    if (authStore.loading) {
      return <Loader />
    } else {
      return <Route {...rest} />
    }
  }
}

export default withRouter(inject('authStore')(observer(AuthorizedRoute)))
