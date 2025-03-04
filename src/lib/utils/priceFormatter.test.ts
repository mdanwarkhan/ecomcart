import { priceFormatter } from './priceFormatter'

describe('priceFormatter', () => {
  test('should format the price correctly for given price and quantity', () => {
    const price = 100
    const quantity = 2
    const result = priceFormatter(price, quantity)
    expect(result).toBe('₹200.00')
  })

  test('should format the price correctly for fractional price and quantity', () => {
    const price = 99.99
    const quantity = 1.5
    const result = priceFormatter(price, quantity)
    expect(result).toBe('₹149.98')
  })
})
