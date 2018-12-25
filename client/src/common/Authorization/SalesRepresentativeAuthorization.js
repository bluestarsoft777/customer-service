import { inject, observer } from 'mobx-react'

/**
 * Component will render children when user is Sales representative.
 *
 * @param {any} props
 * @param {any} props.authStore Auth store
 * @param {any[]} props.children React children
 */
const SalesRepresentativeAuthorization = ({ authStore, children }) => {
  if (!authStore.isSalesRepresentative) {
    return null
  }

  return children
}

export default inject('authStore')(observer(SalesRepresentativeAuthorization))
