import * as Knex from 'knex';
import * as faker from 'faker'

exports.seed = function (knex: Knex): any {
    return knex('users').del()
        .then(function () {
            return knex('users').insert(
                createFakeUsers()
            );
        });
};

function createFakeUsers () {
    const people = []

    for (let i = 0; i < 10000; i++) {
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = `${firstName}.${lastName}@${faker.internet.domainName()}`.toLocaleLowerCase()

        people.push({
            first_name: firstName,
            last_name: lastName,
            email,
            is_hot: faker.random.boolean()
        })
    }

    return people
}
