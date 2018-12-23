# Customer service app

## TODO

**Functionality**

- (TEST) pagination reuses filters
- (TEST) Add admin/sales representative check for routes
- (TODO) Add "Hot" status and filter
- (TODO) Add view profile route when logged in
- Show error if data fails to load

**General**

- add instructions for installation and setup
- add general overview docs
- add architecture explanation & benefits
- add SQLite setup - easier to get started with

## Use case

As a Sales representative I need to see a list of customers from the customers service

As a Sales representative I need to see a list of all customers with status Hot from the customer service.

### Limitations:

- The customer data does not really matter - the service can return whatever is suitable for the demo purpose

### Technical requirements:

- (TODO) It should be easy for us to configure and test your solution. Less than 5 minutes.

- (OK) You have to create the customer service

- (OK) The customer service should be independent of the user interface (different applications)

- (OK) The user should be authenticated through Auth0 (OK)

- (OK) The role should be set in Auth0 (Auth0 used also for Authorization rules)

- (NEXT) The customer service should return HTTP 401 if the user is not authorized

- (OK) The user interface should have a button to start the authentication process

- (OK) The customer service must be implemented in either .Net Core or Node.js

## Database

### Configuration

#### Only for PostgreSQL

Setting up PostgreSQl involves a couple of steps. This section can be ignored if using SQLite.

To setup a PostgreSQL database, we need to create a user and a database:

```sh
# First make sure PostgreSQL is installed and running
# Check the status with (command may differ depending on the OS)
sudo systemctl start postgresql

# After making sure it's running connect to it with postgres user
# or whatever root user is registered
sudo -u postgres psql

# Then create the database
create database [database_name];

# Create a user for it
create user [database_user] with encrypted password '[database_password]';

# Grant the privileges to the user
grant all privileges on database [database_name] to [database_user];
```

After creating the database and the user and allowing user access to the database,
then update .env file:

```sh
...
DB_CLIENT = pg # update from sqlite3
DB_CONNECTION = postgres://[database_user]:[database_password]@localhost:5432/[database_name]
```

### Migrations

Migrations are handled via knex, the common commands can be run via npm/yarn:

```sh
# create a migration
npm run db:create-migration [migration_name]

# run migrations
npm run db:migrate

# undo migrations
npm run db:migrate-undo
```

### Seeds

To seed the database with test data just run:
```sh
npm run db:load
```
