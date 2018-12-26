import React from 'react'
import { inject, observer } from 'mobx-react'

const LogInOutButton = ({ className, authStore }) => {
  const classes = className
    ? `button is-link ${className}`
    : 'button is-link'

  if (authStore.isLoggedIn) {
    return (
      <button className={classes} onClick={authStore.logout} data-cy='logout-button'>
        <strong>Log out</strong>
      </button>
    )
  } else {
    return (
      <button className={classes} onClick={authStore.login} data-cy='login-button'>
        <strong>Log in</strong>
      </button>
    )
  }
}

export default inject('authStore')(observer(LogInOutButton))
