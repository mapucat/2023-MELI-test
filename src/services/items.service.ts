import { type ApiResponse } from '../types/api-response'

/**
   * Get items list given a search param
   * @param {*} q search param
   */
export const getItems = async (q: string): Promise<ApiResponse> =>
  await fetch(`/api/items?q=${q}`)
    .then(async (response) => {
      return await response.json()
    })
