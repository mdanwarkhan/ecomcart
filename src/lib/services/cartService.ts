import { Item } from '../types/Cart'
import { Product } from '../types/Product'
import { mapCart } from '../mappers/cartMapper'
import { mapProducts } from '../mappers/productMapper'
import { CART_ENDPOINTS } from './cartEndpoints'
import useAxios from '../hooks/useAxios'

export const fetchCart = async (id: number): Promise<Item[]> => {
  const data = await useAxios(CART_ENDPOINTS.FETCH_CART(id))
  return mapCart(data)
}

export const fetchProductDetails = async (id: number): Promise<Product> => {
  return await useAxios(CART_ENDPOINTS.FETCH_PRODUCT_DETAILS(id))
}

export const fetchProducts = async (cartItems: Item[]): Promise<Product[]> => {
  const productPromises = cartItems.map((item: Item) =>
    fetchProductDetails(item.productId)
  )
  const productResponses = await Promise.allSettled(productPromises)

  return mapProducts(productResponses, cartItems)
}
