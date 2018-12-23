import Router from 'koa-router'
import { Container } from 'container'
import { getUserRoutes } from './userRoutes'
import { getCustomerRoutes } from './customerRoutes'


export function getRouter (container: Container) {
  const router = new Router()
  const api = new Router()

  api.use(getUserRoutes(container))
  api.use(getCustomerRoutes(container))
  // .. register routes here

  router.get('/', (ctx) => {
    ctx.body = {
      test: 'me'
    }
  })
  router.use('/api', api.routes(), api.allowedMethods())

  return router
}
