import React, { createContext, ReactNode, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../../lib/types/Product'
import { Item } from '../../lib/types/Cart'
import { fetchCart, fetchProducts } from '../../lib/services/cartService'

interface CartContextType {
  cart: Product[]
  setCartId: (id: number) => void
  removeFromCart: (id: number) => void
  updateProductQuantity: (productId: number, productCount: number) => void
  getTotalPrice: () => number
  isLoading: boolean
  error: Error | null
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({
  children,
}): React.ReactNode => {
  const [cart, setCart] = React.useState<Product[]>([])
  const [cartId, setCartId] = React.useState<number>(0)

  const {
    data: cartProducts,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery<Item[], Error>({
    queryKey: ['cart', cartId],
    queryFn: () => fetchCart(cartId),
    retry: false,
    enabled: !!cartId,
  })

  const {
    data: products,
    isLoading: isProductLoading,
    error: productsError,
  } = useQuery<Product[], Error>({
    queryKey: ['products', cartProducts],
    queryFn: () =>
      cartProducts ? fetchProducts(cartProducts) : Promise.resolve([]),
    enabled: !!cartProducts && cartProducts.length > 0,
  })

  const isLoading = isCartLoading || isProductLoading
  const error = cartError || productsError

  useEffect(() => {
    if (products) {
      setCart(products)
    }
  }, [products])

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateProductQuantity = (productId: number, productCount: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId && product.quantity + productCount > 0
          ? { ...product, quantity: product.quantity + productCount }
          : product
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        removeFromCart,
        updateProductQuantity,
        getTotalPrice,
        isLoading,
        error,
        setCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
