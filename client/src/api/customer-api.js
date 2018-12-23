import api from './api'
import qs from 'query-string'

function getCustomers (filters) {
  const queryParams = qs.stringify(filters)
  return api.get(`/api/customers?${queryParams}`)
}

function getCustomer (customerId) {
  return api.get(`/api/customers/${customerId}`)
}

export {
  getCustomers,
  getCustomer
}
