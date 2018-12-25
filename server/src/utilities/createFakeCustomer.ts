import { Customer } from "domain/customer";
import * as faker from 'faker'

export function createFakeCustomer () : any {
  return createCustomerBaseDate()
}


export function createFakeCustomerWithId (id?: number) : Customer {
  let _id

  if (id) {
    _id = id
  } else {
    _id = faker.random.number({
      min: 0,
      max: 1000000,
      precision: 0
    })
  }

  return {
    ...createCustomerBaseDate(),
    id: _id
  }
}

function createCustomerBaseDate () {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = `${firstName}.${lastName}@${faker.internet.domainName()}`.toLocaleLowerCase()

  return {
    firstName: firstName,
    lastName: lastName,
    email,
    isHot: faker.random.boolean(),
    joinedOn: faker.date.recent().toISOString()
  }
}
