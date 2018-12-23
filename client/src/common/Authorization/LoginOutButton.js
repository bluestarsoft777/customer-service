import React from 'react'
import { inject, observer } from 'mobx-react'

const LogInOutButton = ({ authStore }) => {
  if (authStore.isLoggedIn) {
    return (
      <button className='button is-link' onClick={authStore.logout}>
        <strong>Log out</strong>
      </button>
    )
  } else {
    return (
      <button className='button is-link' onClick={authStore.login}>
        <strong>Log in</strong>
      </button>
    )
  }
}

export default inject('authStore')(observer(LogInOutButton))
