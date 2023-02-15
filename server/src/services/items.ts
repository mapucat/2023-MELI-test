import axios, { AxiosError, HttpStatusCode } from 'axios'
import { CommonCustomError } from "../types/custom-error"

import { getConfig } from '../helpers/get-config/get-config'
import { SearchResponse } from '../types/search-response'
import MELISearchResult from '../types/meli-search-result'
import ItemResponse from '../types/item-response'
import MELIItemResult from '../types/meli-item-result'
import MELIItemDescriptionResult from '../types/meli-item-description-result'

/**
 * Get items given a seach query
 * @param {*} q search query
 * @returns items
 */
export const searchItems = async (q: string, limit: number): Promise<SearchResponse> => {
  if (q === null || q === undefined || q.length === 0) {
    throw CommonCustomError.getEmptyQueryError()
  }
  const { data: searchResult }: { data: MELISearchResult } = 
    await axios.get(`${getConfig('api.mainUrl')}${getConfig('api.urlComplement')}/search`, {
      params: { q, limit }
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.NotFound) throw CommonCustomError.getNoDataFoundError(error)
      throw CommonCustomError.getUnkownError(error)
    });
  if (searchResult.results.length < 0) {
    throw CommonCustomError.getNoDataFoundError()
  }
  return new SearchResponse(searchResult)
}

/**
 * Get item given an item's id
 * @param {*} id item id
 * @returns item found
 */
export const getItem = async (id: string): Promise<ItemResponse> => {
  if (id === null || id === undefined || id.length === 0) {
    throw CommonCustomError.getEmptyQueryError()
  }
  const itemDescription: MELIItemDescriptionResult = await getItemDescription(id)
  const { data: itemResult }: { data: MELIItemResult } = 
    await axios.get(`${getConfig('api.mainUrl')}/items/${id}`)
      .catch((error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.NotFound) throw CommonCustomError.getNoDataFoundError(error)
        throw CommonCustomError.getUnkownError(error)
      })
  return new ItemResponse(itemResult, itemDescription)
}

/**
 * Get item's description given an item's id
 * @param {*} id item id
 * @returns object with description as property
 */
export const getItemDescription = async (id: string): Promise<MELIItemDescriptionResult> => {
  if (id === null || id === undefined || id.length === 0) {
    throw CommonCustomError.getEmptyQueryError()
  }
  const { data: itemDescriptionResult }: { data: MELIItemDescriptionResult} =
    await axios.get<MELIItemDescriptionResult>(`${getConfig('api.mainUrl')}/items/${id}/description`)
      .catch((error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.NotFound) throw CommonCustomError.getNoDataFoundError(error)
        throw CommonCustomError.getUnkownError(error)
      })
  return itemDescriptionResult
}
