import { CustomerRepository, Customer, Filters, CustomerSearchResult } from "../domain/customer";

type dependencies = {
  customerRepository: CustomerRepository
}

export function makeGetCustomerList({ customerRepository }: dependencies) {
  return async function getCustomerList(filters: Filters): Promise<CustomerSearchResult> {
    const customers = await customerRepository.findAll(filters)
    return customers
  }
}
