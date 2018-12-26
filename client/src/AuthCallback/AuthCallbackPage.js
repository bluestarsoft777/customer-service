import React from 'react'
import Loader from '../common/Loader'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

class AuthCallbackPage extends React.Component {
  componentDidMount = () => {
    if (!this.props.authStore.isLoggedIn) {
      this.props.authStore.handleAuthFromHash({
        onAuth: this.authSuccess,
        onError: this.authFailed
      })
    } else {
      this.props.history.replace('/')
    }
  }

  authSuccess = () => {
    this.props.history.replace('/')
  }

  authFailed = (error) => {
    console.error('redirect somewhere', error)
  }

  render () {
    return (
      <div className='auth-callback-page'>
        <Loader />
      </div>
    )
  }
}

export default withRouter(
  inject('authStore')(
    observer(AuthCallbackPage)
  )
)
