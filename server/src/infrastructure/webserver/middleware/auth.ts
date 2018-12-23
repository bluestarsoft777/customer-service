import { Context } from 'koa'

export function authorized (ctx: Context, next: Function) {
  if (!ctx.state.jwt) {
    ctx.throw(401, new Error('Unathorized'))
  }

  return next()
}

export function isSalesRepresentative (ctx: Context, next: Function) {
  if (!ctx.state.jwt) {
    ctx.throw(401, new Error('Unathorized'))
  }

  const jwt = ctx.state.jwt
  const roles = jwt['https://customer-service.com/roles']

  if (roles.includes('sales-representative')) {
    return next()
  } else {
    ctx.throw(403, new Error('Forbidden'))
  }
}
