import { HttpStatusCode } from 'axios'
import express, { Express, Request, Response } from 'express'
import { getConfig } from './helpers/get-config/get-config'

import routes from './routes/routes'
import { ApiResponse } from './types/api-response'
import { CommonCustomError } from './types/custom-error'

const app: Express = express()
const port = getConfig('port')

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
  });
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`)
})
