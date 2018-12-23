import path from 'path'
import { config } from 'dotenv'
config({path: path.join(__dirname, '../../../.env')})

const { DB_CLIENT, DB_CONNECTION } = process.env

const options = {
  client: DB_CLIENT || 'sqlite3',
  connection: DB_CONNECTION || { filename: path.join(__dirname, './dev.sqlite3') },
  migrations: {
    directory: path.join(__dirname, './migrations'),
    tableName: 'migrations'
  },
  debug: false,
  seeds: {
    directory: path.join(__dirname, './seeds'),
  },
  useNullAsDefault: !DB_CLIENT || DB_CLIENT === 'sqlite3'
}

// typescript complains about pool property
// if (DB_CLIENT && DB_CLIENT !== 'sqlite3') {
//   options.pool = {
//     min: 2,
//     max: 10
//   }
// }

module.exports = {
  development: Object.assign({}, options),
  test: Object.assign({}, options, {
    connection: DB_CONNECTION || { filename: path.join(__dirname, 'data/test.sqlite3') }
  }),
  production: Object.assign({}, options, {
    connection: DB_CONNECTION || { filename: path.join(__dirname, 'data/prod.sqlite3') }
  })
}
