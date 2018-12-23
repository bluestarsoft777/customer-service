import { extendObservable } from 'mobx'
import { getCustomer } from '../../api/customer-api'

export default class CustomerStore {
  constructor () {
    extendObservable(this, {
      loading: true,
      error: null,
      customerId: null,
      customerData: null
    })
  }

  loadCustomer = async (customerId) => {
    try {
      this.loading = true
      const data = await getCustomer(customerId)
      this.customerData = data
      this.loading = false
    } catch (error) {
      this.error = error
      this.loading = false
    }
  }
}
