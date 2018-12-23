import * as Knex from "knex";

exports.up = function (knex: Knex): Knex.SchemaBuilder {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id')
      table.string('email').unique().notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.boolean('is_hot').notNullable().defaultTo(false)
      table.timestamps(true, true)
    })
};

exports.down = function (knex: Knex): Knex.SchemaBuilder {
  return knex.schema
    .dropTableIfExists('users')
};
