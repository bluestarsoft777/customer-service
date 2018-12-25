import { CustomerRepository, Customer, EditCustomer, toCustomer, Filters, CustomerSearchResult } from '../../../domain/customer';
import { createFakeCustomerWithId } from 'utilities/createFakeCustomer';
import { getLimitAndOffset } from '../storageUtilities';

// in memory 'DB'
let customersList : Customer[] = []

for (let i = 1; i < 100; i++) {
  customersList.push(createFakeCustomerWithId(i))
}

export const customerRepository: CustomerRepository = {
  create,
  findAll,
  findById,
  findByEmail,
  delete: _delete, // workaround for delete keyword
  update
}

async function create(customerData: any): Promise<Customer> {
  const newCustomer = createFakeCustomerWithId()
  customersList.push(newCustomer)
  return newCustomer
}


async function findAll(filters: Filters, /*transaction*/): Promise<CustomerSearchResult> {
  const {
    limit,
    offset
  } = getLimitAndOffset(filters.page)

  const customers = customersList.slice(offset, limit)

  return {
    data: customers,
    count: customers.length
  }
}

async function findById(customerId: number): Promise<Customer | null> {
  return customersList.find(c => c.id === customerId)
}

async function findByEmail(email: string): Promise<Customer | null> {
  return customersList.find(c => c.email === email)
}

async function _delete(customerId: number): Promise<any> {
  const index = customersList.findIndex(c => c.id === customerId)
  customersList.splice(index, 1)
}

async function update(customerId: number, customerData: EditCustomer): Promise<Customer> {
  let customer = customersList.find(c => c.id === customerId)

  for (let key of Object.keys(customerData)) {
    // @ts-ignore
    customer[key] = customerData[key]
  }

  return customer
}
