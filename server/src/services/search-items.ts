import axios from 'axios'
import { CommonCustomError } from "../types/custom-error"

import { getConfig } from '../helpers/get-config/get-config'
import { SearchResponse } from '../types/search-data'
import MELISearchResult from '../types/search-result'

/**
 * Get items given a seach query
 * @param {*} q search query
 * @returns items
 */
export const searchItems = async (q: string, limit: number): Promise<SearchResponse | null> => {
  let searchResponse: SearchResponse | null = null
  if (q === null || q === undefined || q.length === 0) {
    throw CommonCustomError.getEmptyQueryError()
  }
  await axios.get(`${getConfig('api.url')}/search`, {
    params: {
      q,
      limit
    }
  })
    .then(({ data }: { data: MELISearchResult }) => searchResponse = new SearchResponse(data))
    .catch((error: Error) => {
      throw CommonCustomError.getUnkownError(error)
    });
  if (SearchResponse.IsEmpty(searchResponse)) {
    throw CommonCustomError.getNoDataFoundError()
  }
  return searchResponse
}
