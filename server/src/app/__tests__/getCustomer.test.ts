import { makeGetCustomer } from "../getCustomer";
import { customerRepository } from '../../interfaces/storage/customerRepository'
jest.mock('interfaces/storage/customerRepository')

test('user can get customer data', async () => {
  const customerId = 1
  const getCustomer = makeGetCustomer({ customerRepository })
  const customer = await getCustomer(customerId)
  expect(customer.id).toEqual(customerId)
})
