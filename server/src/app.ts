require('dotenv').config()

import { server } from './infrastructure/webserver/config'
import app from './infrastructure/webserver'
import { container } from './container'

process.once('SIGINT', app.shutDown)
process.once('SIGTERM', app.shutDown)

app.server.on('error', onError)
app.server.on('listening', onListening)

app.setup(container)
  .then(() => {
    app.server.listen(server.port, server.host)
  })


function onError (error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof server.port === 'string'
    ? 'Pipe ' + server.port
    : 'Port ' + server.port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening () {
  var addr = app.server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}
