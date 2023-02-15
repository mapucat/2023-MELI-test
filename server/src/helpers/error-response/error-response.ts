import { HttpStatusCode } from 'axios'
import { CustomError } from '../../types/custom-error'
import { ApiResponse } from '../../types/api-response'

export const generateErrorResponse = (error: any): { status: number, response: ApiResponse } => {
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
  return { status, response }
}
