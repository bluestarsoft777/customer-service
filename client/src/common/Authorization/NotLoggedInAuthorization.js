import { inject, observer } from 'mobx-react'

/**
 * Component will render children when user isn't logged in.
 *
 * @param {any} props
 * @param {any} props.authStore Auth store
 * @param {any[]} props.children React children
 */
const NotLoggedInAuthorization = ({ authStore, children }) => {
  if (authStore.isLoggedIn) {
    return null
  }

  return children
}

export default inject('authStore')(observer(NotLoggedInAuthorization))
