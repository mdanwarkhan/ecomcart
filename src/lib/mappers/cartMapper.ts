import { Item } from '../types/Cart'

export const mapCart = (data: any): Item[] => {
  return data.products.map((item: Item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }))
}
