import React, { createContext, ReactNode, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../../lib/types/Product'
import { CartContextType, Item } from '../../lib/types/Cart'
import { fetchCart, fetchProducts } from '../../lib/services/cartService'
import { AxiosError } from 'axios'

// Create the context with an undefined default value
export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({
  children,
}): React.ReactNode => {
  const [cart, setCart] = React.useState<Product[]>([])
  const [cartId, setCartId] = React.useState<number>(0)

  // Fetch the cart products based on the cart ID
  const {
    data: cartProducts,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery<Item[], AxiosError>({
    queryKey: ['cart', cartId],
    queryFn: () => fetchCart(cartId),
    retry: false,
    enabled: !!cartId,
  })

  // Fetch the product details based on the cart products
  const {
    data: products,
    isLoading: isProductLoading,
    error: productsError,
  } = useQuery<Product[], AxiosError>({
    queryKey: ['products', cartProducts],
    queryFn: () =>
      cartProducts ? fetchProducts(cartProducts) : Promise.resolve([]),
    enabled: !!cartProducts && cartProducts.length > 0,
  })

  // Determine if data is loading or if there is an error
  const isLoading = isCartLoading || isProductLoading
  const error = cartError || productsError

  // Update the cart state when products data changes
  useEffect(() => {
    if (products) {
      setCart(products)
    }
  }, [products])

  // Function to remove a product from the cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Function to update the quantity of a product in the cart
  const updateProductQuantity = (productId: number, productCount: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId && product.quantity + productCount > 0
          ? { ...product, quantity: product.quantity + productCount }
          : product
      )
    )
  }

  // Function to calculate the total price of the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Provide the context values to the children components
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