import { type ApiResponse } from '../types/api-response.d'

/**
   * Get items list given a search param usign fetch
   * @param {*} q search param
   */
export const getItems = async (q: string): Promise<ApiResponse> =>
  await fetch(`/api/items?q=${q}`)
    .then(async (response) => await response.json())

/**
   * Get an item given the id using fetch
   * @param {*} id items's
   */
export const getItemDetail = async (id: string): Promise<ApiResponse> =>
  await fetch(`/api/items/${id}`)
    .then(async (response) => await response.json())
