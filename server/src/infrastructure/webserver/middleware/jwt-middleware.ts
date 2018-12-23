import { Context } from 'koa'
import jwt, { SecretLoader } from 'koa-jwt'
import { koaJwtSecret } from 'jwks-rsa'

function getToken (ctx: Context, opts: any) {
  const { authorization } = ctx.header

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1]
  }

  return null
}

const jwtMiddleware = jwt({
  getToken,
  // override type to secred loader since the compiler is complaining
  secret: <SecretLoader> koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dbadrov.eu.auth0.com/.well-known/jwks.json"
  }),
  // audience: 'https://customers-api.my-app.com',
  // issuer: "https://dbadrov.eu.auth0.com/",
  algorithms: ['RS256'],
  passthrough: true,
  key: 'jwt'
})

export default jwtMiddleware
