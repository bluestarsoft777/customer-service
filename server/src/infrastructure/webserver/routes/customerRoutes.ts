import Router from 'koa-router'
import { Container } from 'container';
import { validate } from '../../../utilities/validationToPromise';
import { FiltersV, Filters } from '../../../domain/customer';
import { authorized, isSalesRepresentative } from '../middleware/auth';

export function getCustomerRoutes (container: Container) {
  const router = new Router()

  router.get('/customers', authorized, isSalesRepresentative, async ctx => {
    const filters = await getFilterParams(ctx.query)
    const user = await container.getCustomerList(filters)
    ctx.body = user
  })


  router.get('/customers/:id', authorized, isSalesRepresentative, async ctx => {
    const { id } = ctx.params
    const registeredUser = await container.getCustomer(id)
    ctx.body = registeredUser
  })

  return router.routes()
}

function getFilterParams (queryParams: any) : Promise<Filters> {
  const filters = parseParamsToFilters(queryParams)
  return validate(FiltersV, filters)
}

function parseParamsToFilters(queryParams: any): any {
  return {
    ...queryParams,
    page: ensureNumber(queryParams.page),
    isHot: ensureBoolean(queryParams.isHot)
  }
}

function ensureNumber (value: any, defaultValue: number = 1): number {
  let num = parseInt(value, 10)
  num = Number.isNaN(num) ? defaultValue : num
  return num
}

function ensureBoolean (value: any): boolean {
  if (value === 'false') return false
  const bool = value === undefined ? undefined : Boolean(value)
  return bool
}
