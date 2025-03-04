import { fetchCart, fetchProductDetails } from './cartService'
import { CART_ENDPOINTS } from './cartEndpoints'
import useAxios from '../hooks/useAxios'
import { Item } from '../types/Cart'
import { mapCart } from '../mappers/cartMapper'

jest.mock('../hooks/useAxios')
jest.mock('../mappers/cartMapper')
jest.mock('../mappers/productMapper')

const mockData = {
  id: 2,
  userId: 1,
  products: [
    {
      productId: 2,
      quantity: 4,
    },
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 5,
      quantity: 2,
    },
  ],
}

describe('cartService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fetch cart and map data', async () => {
    const mappedData: Item[] = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 6 },
    ];
    (useAxios as jest.Mock).mockResolvedValue(mockData);
    (mapCart as jest.Mock).mockResolvedValue(mappedData);

    const result = await fetchCart(1)

    expect(useAxios).toHaveBeenCalledWith(CART_ENDPOINTS.FETCH_CART(1))
    expect(mapCart).toHaveBeenCalledWith(mockData)
    expect(result).toEqual(mappedData)
  })

  test('should handle fetch cart error', async () => {
    const mockError = new Error('Failed to fetch cart');
    (useAxios as jest.Mock).mockRejectedValue(mockError)

    await expect(fetchCart(1)).rejects.toThrow('Failed to fetch cart')
    expect(useAxios).toHaveBeenCalledWith(CART_ENDPOINTS.FETCH_CART(1))
  })

  test('should fetch product details', async () => {
    const mockProduct = {
      id: 1,
      title: 'Product 1',
      image: 'imageurl',
      price: 45.5,
    };
    (useAxios as jest.Mock).mockResolvedValue(mockProduct)

    const result = await fetchProductDetails(1)

    expect(useAxios).toHaveBeenCalledWith(
      CART_ENDPOINTS.FETCH_PRODUCT_DETAILS(1)
    )
    expect(result).toEqual(mockProduct)
  })

  test('should handle fetch product details error', async () => {
    const mockError = new Error('Failed to fetch product details');
    (useAxios as jest.Mock).mockRejectedValue(mockError)

    await expect(fetchProductDetails(1)).rejects.toThrow(
      'Failed to fetch product details'
    )
    expect(useAxios).toHaveBeenCalledWith(
      CART_ENDPOINTS.FETCH_PRODUCT_DETAILS(1)
    )
  })
})
