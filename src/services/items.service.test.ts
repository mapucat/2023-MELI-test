import { assetsFetchMock } from "../helpers/test-facilities/assets-fetch"
import { getItems } from "./items.service"

// eslint-disable-next-line jest/no-mocks-import
import response from '../../__mocks__/api-items-success-response.json'

describe('ItemService is called', () => {
  beforeEach(() =>
    jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock(response)))

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Given a success response from fetch function then it should return the same value', async () => {
    const result = await getItems('celular')
    expect(result).toBe(response)
  })
})
