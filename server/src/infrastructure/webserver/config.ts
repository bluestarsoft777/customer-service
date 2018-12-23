import _ from 'lodash'
import path from 'path'

const ROOT = path.resolve(__dirname, '../')
const NODE_ENV = _.defaultTo(process.env.NODE_ENV, 'development')

const isProd = NODE_ENV === 'production'
const isTest = NODE_ENV === 'test'
const isDev = NODE_ENV === 'development'

export const server = {
  port: normalizePort(_.defaultTo(process.env.PORT, 3000)),
  host: _.defaultTo(process.env.HOST, 'localhost'),
  root: ROOT,
  data: path.join(ROOT, '../', '/data')
}


export const secret = _.defaultTo(process.env.SECRET, 'secret')

export const jwtSecret = _.defaultTo(process.env.JWT_SECRET, 'secret')

export const jwtOptions = {
  expiresIn: '7d'
}

function normalizePort(val: string|number): number {
  if (typeof val === 'number') {
    return val
  }

  const port = parseInt(val, 10)

  if (Number.isNaN(port) || port <= 0) {
    throw new Error('Invalid port specified')
  }

  return port
}


export const env = {
  isDev,
  isProd,
  isTest
}

export const cors = {
  origin: '*',
  exposeHeaders: ['Authorization'],
  credentials: true,
  allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowHeaders: ['Authorization', 'Content-Type'],
  keepHeadersOnError: true
}

export const bodyParser = {
  enableTypes: ['json']
}
