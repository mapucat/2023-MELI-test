import { HttpStatusCode } from "axios"

export const CommonCustomError = {
  getEmptyQueryError: (error?: Error) => new CustomError(error, HttpStatusCode.BadRequest, 'No results matching your search criteria. Please modify your search and try again.'),
  getNoDataFoundError: (error?: Error) => new CustomError(error, HttpStatusCode.NotFound, 'No data found. Please make sure your input is correct and try again.'),
  getUnkownError: (error?: Error) => new CustomError(error, HttpStatusCode.InternalServerError, 'Opps... something just happened')
}

export class CustomError extends Error {
  /**
   * Http status related to this error
   */
  httpStatusCode: HttpStatusCode

  /**
   * Original error 
   */
  initialError?: Error | undefined

  /**
   * Creates a Custom error adding new attributes
   */
  constructor(initialError: Error | undefined, httpStatusCode: HttpStatusCode, ...params: any) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
    this.initialError = initialError
    this.httpStatusCode = httpStatusCode
  }
}
