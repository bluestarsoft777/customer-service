import * as Knex from 'knex';
import { createFakeCustomer } from 'utilities/createFakeCustomer';

exports.seed = function (knex: Knex): any {
    return knex('users').del()
        .then(function () {
            return knex('users').insert(
                createFakeUsers()
            );
        });
};

function createFakeUsers () {
    const customers = []

    for (let i = 0; i < 10000; i++) {
        const customer = createFakeCustomer()
        customers.push(customer)
    }

    return customers
}
