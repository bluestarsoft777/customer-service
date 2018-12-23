import React from 'react'
import { inject, observer } from 'mobx-react'

const SalesRepresentativeAuthorization = ({ authStore, children }) => {
  if (!authStore.isSalesRepresentative) {
    return null
  }

  return children
}

export default inject('authStore')(observer(SalesRepresentativeAuthorization))
