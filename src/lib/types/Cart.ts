import { Product } from './Product'

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface Item {
  productId: number
  quantity: number
}
