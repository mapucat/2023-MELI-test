import axios, { type AxiosResponse } from 'axios'

/**
   * Get items list given a search param
   * @param {*} q search param
   */
export const getItems = async (q: string): Promise<AxiosResponse> =>
  await axios.get(`/api/items`, {
    params: {
      q
    }
  })
