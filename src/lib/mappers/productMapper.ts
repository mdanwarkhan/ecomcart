import { Item } from '../types/Cart'
import { Product } from '../types/Product'

export const mapProducts = (
  productsResponse: any,
  cartItems: Item[]
): Product[] => {
  return productsResponse.map((response: any, index: number) => {
    if (response.status === 'fulfilled') {
      return {
        id: response.value.id,
        title: response.value.title,
        image: response.value.image,
        price: response.value.price,
        quantity: cartItems[index].quantity,
      }
    } else {
      return null
    }
  })
}
