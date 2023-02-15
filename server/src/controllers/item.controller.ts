import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'
import { getConfig } from '../helpers/get-config/get-config'
import { generateErrorResponse } from '../helpers/error-response/error-response'
import { getItem, searchItems } from '../services/items'
import { ApiResponse } from '../types/api-response'

/**
 * Get items given a query param
 * @param {*} req request
 * @param {*} res response
 */
export const getItemsList = async (req: Request, res: Response<ApiResponse>) => {
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
    const { status, response } = generateErrorResponse(error)
    res.status(status).send(response)
  }
}

/**
 * Get item with description attached given a query string param
 * @param {*} req request
 * @param {*} res response
 */
export const getItemWithDetails = async (req: Request, res: Response<ApiResponse>) => {
  try {
    res.send({
      meta: {
        status: HttpStatusCode.Ok,
        message: 'Data found'
      },
      response: {
        success: true,
        data:  await getItem(req.params.uid)
      }
    });
  } catch(error: any) {
    const { status, response } = generateErrorResponse(error)
    res.status(status).send(response)    
  }
}
