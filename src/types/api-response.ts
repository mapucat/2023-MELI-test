import { type HttpStatusCode } from "axios"
import { type ISearchData } from "./search-data"

export interface ApiResponse {
  response: SuccessResponse | ErrorResponse
  meta: Meta
}

export interface Meta {
  status: HttpStatusCode
  message: string
}

export interface SuccessResponse {
  success: true
  data: ISearchData
}

export interface ErrorResponse {
  success: false
  stringError: string | null
}
