import * as t from 'io-ts'

export const CustomerV = t.type({
  id: t.number,
  firstName: t.string,
  lastName: t.string,
  email: t.string,
  joinedOn: t.string,
  isHot: t.boolean
})

export type Customer = t.TypeOf<typeof CustomerV>

export type CustomerSearchResult = {
  data: Customer[],
  count: number
}

export type EditCustomer = {
  firstName?: string,
  lastName?: string,
  email?: string,
  // ...optional fields
}

export function toCustomer (customerData: any) : Customer {
  return {
    id: customerData.id,
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    email: customerData.email,
    joinedOn: customerData.createdAt,
    isHot: customerData.isHot
  }
}


export type CustomerRepository = {
  create: (customerData: any) => Promise<Customer>,
  delete: (customerId: number) => Promise<any>,
  update: (customerId: number, customerData: EditCustomer) => Promise<Customer>,
  findByEmail: (email: string) => Promise<Customer|null>,
  findById: (customerId: number) => Promise<Customer|null>,
  findAll: (filters: Filters) => Promise<CustomerSearchResult>
}

const RequiredFiltersV = t.type({
  page: t.number
})

const OptionalFiltersV = t.partial({
  email: t.string,
  firstName: t.string,
  lastName: t.string,
  isHot: t.boolean,
})

export const FiltersV = t.intersection([RequiredFiltersV, OptionalFiltersV])

export type Filters = t.TypeOf<typeof FiltersV>
