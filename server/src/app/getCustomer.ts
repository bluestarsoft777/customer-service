import { CustomerRepository, Customer } from "../domain/customer";

type dependencies = {
  customerRepository: CustomerRepository
}

export function makeGetCustomer({ customerRepository }: dependencies) {
  return async function getCustomer(customerId: number): Promise<Customer> {
    const customer = await customerRepository.findById(customerId)

    if (!customer) {
      // throw some error?
    }

    return customer
  }
}
