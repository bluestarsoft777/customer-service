import Router from 'koa-router'
// import auth from '../middleware/auth-required-middleware'
// import typeof * as Container from 'container'
import { Container } from 'container';
import { validate } from 'utilities/validationToPromise';
// import { LoginDataV } from 'app/loginUser';
// import { RegisterUserV } from 'app/registerUser';
// import { decode } from 'jsonwebtoken';
// const ctrl = require('controllers').userController
// const { isAdmin } = require('middleware/permission-middleware')

export function getUserRoutes (container: Container) {
  const router = new Router()

  // router.post('/users/login', async ctx => {
  //   const { body } = ctx.request
  //   const loginData = await validate(LoginDataV, body)
  //   const user = await container.loginUser(loginData)
  //   ctx.body = user
  // })

  // router.post('/users/register', async ctx => {
  //   const { body } = ctx.request
  //   const registrationData = await validate(RegisterUserV, body)
  //   const registeredUser = await container.registerUser(registrationData)
  //   ctx.body = registeredUser
  // })

  // router.post('/users/me', auth, async ctx => {
  //   const userId: number = ctx.state.user.id
  //   const user = await container.getUserProfile(userId)
  //   ctx.body = user
  // })

  return router.routes()
}
