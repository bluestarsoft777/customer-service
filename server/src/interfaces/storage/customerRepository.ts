import db from '../../infrastructure/db'
import humps from 'humps'
import { CustomerRepository, Customer, EditCustomer, toCustomer, Filters, CustomerSearchResult } from '../../domain/customer';
import { getLimitAndOffset } from './storageUtilities'

const customerColumns = ['id', 'email', 'first_name', 'last_name', 'created_at', 'is_hot']

export const customerRepository: CustomerRepository = {
  create,
  findAll,
  findById,
  findByEmail,
  delete: _delete, // workaround for delete keyword
  update
}

async function create(customerData: any): Promise<Customer> {
  const customer = humps.decamelizeKeys(customerData)

  const [createdCustomer] = await db('users')
    .insert(customer)
    // .transacting(transaction)
    .returning(customerColumns)

  const userEntry = humps.camelizeKeys(createdCustomer)
  return toCustomer(userEntry)
}


async function findAll(filters: Filters, /*transaction*/): Promise<CustomerSearchResult> {
  const {
    limit,
    offset
  } = getLimitAndOffset(filters.page)

  const customerEntriesQuery = await db('users')
    // .transacting(transaction)
    .select(customerColumns)
    .limit(limit)
    .offset(offset)
    .where(function () {
      if (filters.email) this.where('email', 'ilike', filters.email + '%')
      if (filters.firstName) this.where('first_name', 'ilike', filters.firstName + '%')
      if (filters.lastName) this.where('last_name', 'ilike', filters.lastName + '%')
      if (filters.isHot !== undefined) this.where('is_hot', '=', filters.isHot)
    })

  const countQuery = await db('users')
    // .transacting(transaction)
    .count()
    .where(function () {
      if (filters.email) this.where('email', 'ilike', filters.email + '%')
      if (filters.firstName) this.where('first_name', 'ilike', filters.firstName + '%')
      if (filters.lastName) this.where('last_name', 'ilike', filters.lastName + '%')
      if (filters.isHot !== undefined) this.where('is_hot', '=', filters.isHot)
    })

  const [customerEntries, countResult] = await Promise.all([
    customerEntriesQuery,
    countQuery
  ])

  const customers = customerEntries.map((customerEntry: any) => {
    const customer = humps.camelizeKeys(customerEntry)
    return toCustomer(customer)
  })

  return {
    data: customers,
    count: getCount(countResult)
  }
}

async function findById(customerId: number): Promise<Customer | null> {
  const customer = await db('users')
    .first(customerColumns)
    // .transacting(transaction)
    .where({ id: customerId })

  const customerEntry = humps.camelizeKeys(customer)
  return toCustomer(customerEntry)
}

async function findByEmail(email: string): Promise<Customer | null> {
  const customer = await db('users')
    .first([...customerColumns, 'password'])
    // .transacting(transaction)
    .where({ email })

  const customerEntry = humps.camelizeKeys(customer)
  return toCustomer(customerEntry)
}

async function _delete(customerId: number): Promise<any> {
  await db('users')
    .where('id', customerId)
    .del()
  // .transacting(transaction)

  return customerId
}

async function update(customerId: number, customerData: EditCustomer): Promise<Customer> {
  const updateData = humps.decamelizeKeys(customerData)

  const [customer] = await db('users')
    .update(updateData)
    .where('id', customerId)
    // .transacting(transaction)
    .returning(customerColumns)

  const customerEntry = humps.camelizeKeys(customer)
  return toCustomer(customerEntry)
}

type CountResultItem = {
  count: number
}

type CountResult = CountResultItem[]

function getCount(countResult: CountResult): number {
  if (countResult && countResult[0]) {
    return countResult[0].count || 0
  } else {
    0
  }
}
