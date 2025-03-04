import { mapCart } from './cartMapper'
import { Item } from '../types/Cart'

describe('mapCart', () => {
  test('should map data to Item array correctly', () => {
    const data = {
      cartId: 3,
      products: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 3 },
      ],
    }

    const expected: Item[] = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ]

    const result = mapCart(data)

    expect(result).toEqual(expected)
  })

  test('should return an empty array when no products are provided', () => {
    const data = { products: [] }

    const expected: Item[] = []

    const result = mapCart(data)

    expect(result).toEqual(expected)
  })
})
