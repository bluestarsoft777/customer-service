import { extendObservable } from 'mobx'
import { getCustomers } from '../../api/customer-api'

export default class CustomerStore {
  constructor () {
    extendObservable(this, {
      loading: true,
      error: null,
      customers: [],
      count: 0,
      filters: {
        page: 1,
        email: '',
        firstName: '',
        lastName: '',
        isHot: undefined // undefined for All, false for normal, true for hot
      },
      get pageCount () {
        return Math.ceil(this.count / 20)
      }
    })
  }

  loadCustomers = async (filters) => {
    try {
      this.loading = true
      const { data, count } = await getCustomers(filters)
      this.customers = data
      this.count = count
      this.loading = false
    } catch (error) {
      this.error = error
      this.loading = false
    }
  }

  filterCustomers = async () => {
    this.loadCustomers(this.filters)
  }
}
