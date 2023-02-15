import { getItems } from "./items.service"

// eslint-disable-next-line jest/no-mocks-import
import response from '../../__mocks__/api-items-success-response.json'

export const assetsFetchMock = async (): Promise<Response> => await Promise.resolve<Response>({
  ok: true,
  status: 200,
  json: async () => await Promise.resolve(response)
} as Response)

describe('ItemService is called', () => {
  beforeEach(() =>
    jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock))

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Given a success response from fetch function then it should return the same value', async () => {
    const result = await getItems('celular')
    expect(result).toBe(response)
  })
})
