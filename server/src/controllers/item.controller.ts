import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'
import { getConfig } from '../helpers/get-config/get-config'
import { searchItems } from '../services/search-items'
import { ApiResponse } from '../types/api-response'
import { CustomError } from '../types/custom-error'

/**
 * Get items given a query param
 * @param {*} req
 * @param {*} res
 */
export const getItemsList = async (req: Request, res: Response) => {
  try {
    res.send({
      meta: {
        status: HttpStatusCode.Ok,
        message: 'Data found'
      },
      response: {
        success: true,
        data: await searchItems(
          req.query.q as string, 
          getConfig('paging.default-limit') as number)
      }
    });
  } catch (error: any) {
    const status = error instanceof CustomError ? error.httpStatusCode : HttpStatusCode.InternalServerError
    const stringError = (error instanceof CustomError ? JSON.stringify(error.initialError) : JSON.stringify(error)) || null
    const response: ApiResponse = {
      meta: {
        status,
        message: error.message
      },
      response: {
        success: false,
        stringError
      }
    }
    res.status(status).send(response)
  }
}
