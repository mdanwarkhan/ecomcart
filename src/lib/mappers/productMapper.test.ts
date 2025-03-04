import { mapProducts } from './productMapper'
import { Item } from '../types/Cart'
import { Product } from '../types/Product'

describe('mapProducts', () => {
  it('should map products correctly when response status is fulfilled', () => {
    const productsResponse = [
      {
        status: 'fulfilled',
        value: { id: 1, title: 'Product 1', image: 'image1.jpg', price: 100 },
      },
      {
        status: 'fulfilled',
        value: { id: 2, title: 'Product 2', image: 'image2.jpg', price: 200 },
      },
    ]
    const cartItems: Item[] = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ]

    const expectedProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        image: 'image1.jpg',
        price: 100,
        quantity: 2,
      },
      {
        id: 2,
        title: 'Product 2',
        image: 'image2.jpg',
        price: 200,
        quantity: 3,
      },
    ]

    const result = mapProducts(productsResponse, cartItems)
    expect(result).toEqual(expectedProducts)
  })

  it('should return null for products with response status not fulfilled', () => {
    const productsResponse = [
      {
        status: 'fulfilled',
        value: { id: 1, title: 'Product 1', image: 'image1.jpg', price: 100 },
      },
      { status: 'rejected', reason: 'Error' },
    ]
    const cartItems: Item[] = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ]

    const expectedProducts: (Product | null)[] = [
      {
        id: 1,
        title: 'Product 1',
        image: 'image1.jpg',
        price: 100,
        quantity: 2,
      },
      null,
    ]

    const result = mapProducts(productsResponse, cartItems)
    expect(result).toEqual(expectedProducts)
  })

  it('should handle empty productsResponse', () => {
    const productsResponse: any[] = []
    const cartItems: Item[] = []

    const expectedProducts: Product[] = []

    const result = mapProducts(productsResponse, cartItems)
    expect(result).toEqual(expectedProducts)
  })
})
