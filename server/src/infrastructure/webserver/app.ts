import { Container } from "container";

const config = require('./config')
const http = require('http')
const Koa = require('koa')
const app = new Koa()

app.keys = [config.secret]

const responseTime = require('koa-response-time')
const helmet = require('koa-helmet')
const logger = require('koa-logger')
// const errorMiddleware = require('middleware/error-middleware')
const cors = require('kcors')
import jwtMiddleware from './middleware/jwt-middleware'
import { Context } from "koa";
// const userMiddleware = require('middleware/user-middleware')
const bodyParser = require('koa-bodyparser')
const { getRouter } = require('./routes')

if (!config.env.isTest) {
  app.use(responseTime())
  app.use(helmet())
}

app.use(jwtMiddleware)


// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx: Context, next: Function){
  return next().catch((err: Error & {status: number}) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

app.use(logger())

// app.use(errorMiddleware)
app.use(cors(config.cors))
// app.use(userMiddleware)
app.use(bodyParser(config.bodyParser))

const server = http.createServer(app.callback())
app.server = require('http-shutdown')(server)

// init required async app parts
app.setup = async (container: Container) => {
  const router = getRouter(container)

  app.use(router.routes())
  app.use(router.allowedMethods())

  // const dbConstants = await db.getDbContants()
  // constants.DB = dbConstants
}

app.shutDown = function shutDown () {
  console.log('Shutdown')

  if (app.server.listening) {
    app.server.shutdown((error: any) => {
      if (error) {
        console.error(error)
        process.exit(1)
      } else {
        process.exit(0)
      }
    })
  }
}

export default app
