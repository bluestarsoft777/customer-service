import { Customer } from "domain/customer";
import * as faker from 'faker'
import { snakeCase } from 'lodash'

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

export function mapCustomerToDbCustomer (customer: Customer) : any {
  let dbCustomer = {}
  for (let key of Object.keys(customer)) {
    if (key !== 'joinedOn') {
      const snakeCasedKey = snakeCase(key)
      // @ts-ignore
      dbCustomer[snakeCasedKey] = customer[key]
    }
  }
  return dbCustomer
}
