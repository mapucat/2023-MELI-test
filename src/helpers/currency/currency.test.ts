import { currencyFormat } from "./currency"

describe('Currency file is used', () => {
  test('Calling currencyFormat then it should return a string', () => {
    expect(currencyFormat(38999)).toBe('$ 38,999')
  })
})
