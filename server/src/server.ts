import express, { Express, Request, Response } from 'express'
import { getConfig } from './helpers/get-config/get-config'

import routes from './routes/routes'
import { ApiResponse } from './types/api-response'
import { CommonCustomError } from './types/custom-error'

const app: Express = express()
const port = getConfig('port')
const logger = require('pino-http')

if (process.env.NODE_ENV !== 'test') {
  app.use(logger({
    quietReqLogger: true,
    transport: {
      target: 'pino-http-print',
      options: {
        destination: 1,
        all: true,
        translateTime: true
      }
    }
  }))
}

app.use('/api', routes)
app.all('**', (req: Request, res: Response<ApiResponse>) => {
  const error = CommonCustomError.getNoDataFoundError()
  res.status(error.httpStatusCode).send({
    meta: {
      status: error.httpStatusCode,
      message: error.message
    },
    response: {
      success: false,
      stringError: JSON.stringify(error)
    }
  })
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[Server]: Running at https://localhost:${port}`)
  })
}

export default app
