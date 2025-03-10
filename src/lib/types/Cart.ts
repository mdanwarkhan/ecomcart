import { AxiosError } from 'axios'
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

export interface CartContextType {
  cart: Product[]
  setCartId: (id: number) => void
  removeFromCart: (id: number) => void
  updateProductQuantity: (productId: number, productCount: number) => void
  getTotalPrice: () => number
  isLoading: boolean
  error: AxiosError | null
}
