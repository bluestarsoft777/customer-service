import { makeGetCustomerList } from "../getCustomerList";
import { customerRepository } from '../../interfaces/storage/customerRepository'
jest.mock('interfaces/storage/customerRepository')

test('user can get customer list data', async () => {
  const getCustomerList = makeGetCustomerList({ customerRepository })
  const { data, count } = await getCustomerList({
    page: 1
  })

  expect(data.length).toEqual(count)
  expect(data.length).toEqual(20)
})
