import * as Knex from 'knex';
import { createFakeCustomer, mapCustomerToDbCustomer } from '../../../utilities/createFakeCustomer';

// @ts-ignore
exports.seed = async function (knex: Knex): any {
    await knex('users').del()
    let fakeUsers = createFakeUsers()

    // insert users in batches to avoid "SQLITE_ERROR: too many SQL variables"
    while (fakeUsers.length > 0) {
        const userBatch = fakeUsers.splice(0, 200)
        await knex('users').insert(userBatch)
    }
};

function createFakeUsers () {
    const customers = []

    for (let i = 0; i < 10000; i++) {
        const customer = createFakeCustomer()
        const dbCustomer = mapCustomerToDbCustomer(customer)
        customers.push(dbCustomer)
    }

    return customers
}
