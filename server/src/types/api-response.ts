import { HttpStatusCode } from "axios"

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
  data: any
}

export interface ErrorResponse {
  success: false
  stringError: string | null
}
