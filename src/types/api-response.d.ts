import { type ISearchData } from "./search-data.d"

export interface ApiResponse {
  response: SuccessResponse | ErrorResponse
  meta: Meta
}

export interface Meta {
  status: number
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
