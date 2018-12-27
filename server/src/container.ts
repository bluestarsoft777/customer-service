import { customerRepository } from './interfaces/storage/customerRepository'
import { makeGetCustomerList } from './app/getCustomerList'
import { makeGetCustomer } from './app/getCustomer'

const getCustomerList = makeGetCustomerList({customerRepository})
const getCustomer = makeGetCustomer({customerRepository})


export const container = {
  getCustomer,
  getCustomerList
}

export type Container = typeof container
