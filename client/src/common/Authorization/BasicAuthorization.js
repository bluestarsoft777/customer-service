import { inject, observer } from 'mobx-react'

/**
 * Component will render children when user is Basic.
 *
 * @param {any} props
 * @param {any} props.authStore Auth store
 * @param {any[]} props.children React children
 */
const BasicUserAuthorization = ({ authStore, children }) => {
  if (!authStore.isBasicUser) {
    return null
  }

  return children
}

export default inject('authStore')(observer(BasicUserAuthorization))
