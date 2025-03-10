import { useCart } from '../../lib/hooks/useCart'
import Card from '../../lib/components/Card/Card'
import ConfirmModal from '../../lib/components/ConfirmModal/ConfirmModal'
import { useCallback, useEffect, useState } from 'react'
import Loader from '../../lib/components/Loader/Loader'
import BottomBar from '../../lib/components/BottomBar/BottomBar'
import { priceFormatter } from '../../lib/utils/priceFormatter'
import { useParams } from 'react-router-dom'
import { MODAL } from '../../lib/constants'
import { Col, Container, Row } from '../../lib/styles/Grid.style'
import { ErrorText } from '../../lib/styles/Error.style'
import EmptyCart from '../../lib/components/EmptyCart/EmptyCart'
import formatAxiosError from '../../lib/utils/axiosErrorFormatter'
import { isAxiosError } from 'axios'

function Cart() {
  // State to control the visibility of the confirmation modal
  const [showModal, setShowModal] = useState(false)
  // State to store the ID of the product to be removed
  const [productId, setProductId] = useState<number | null>(null)
  // Get the cart ID from the URL parameters
  const { cartId } = useParams<{ cartId: string }>()
  // Destructure the necessary functions and state from the useCart hook
  const {
    cart,
    updateProductQuantity,
    removeFromCart,
    getTotalPrice,
    isLoading,
    error,
    setCartId,
  } = useCart()

  // Set the cart ID when the component mounts or the cartId parameter changes
  useEffect(() => {
    if (cartId) {
      setCartId(Number(cartId))
    }
  }, [cartId, setCartId])

  // Function to handle the proceed to checkout action
  const proceedToCheckout = useCallback(() => {
    const cartDetails = {
      cartId,
      totalAmout: getTotalPrice(),
      products: cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
    }
    console.log('cartDetails', cartDetails)
  }, [cart])

  // Function to handle the removal of an item from the cart
  const handleItemRemove = (id: number) => {
    setShowModal(true)
    setProductId(id)
  }

  // Function to confirm the removal of an item from the cart
  const handleConfirm = () => {
    if (productId !== null) {
      removeFromCart(productId)
    }
    setShowModal(false)
  }

  // Function to cancel the removal of an item from the cart
  const handleCancel = () => {
    setShowModal(false)
  }

  // Show a loader if the cart is loading
  if (isLoading) {
    return <Loader />
  }

  return (
    <Container>
      <Row>
        <Col size={12}>
          {/* Display an error message if there is an error */}
          {error && isAxiosError(error) && (
            <ErrorText>{formatAxiosError(error)}</ErrorText>
          )}
          {/* Display the cart items if there are any */}
          {cart?.length > 0 &&
            !isLoading &&
            cart?.map((product) => (
              <Card
                {...product}
                key={product.id}
                onIncrement={() => updateProductQuantity(product.id, 1)}
                onDecrement={() => updateProductQuantity(product.id, -1)}
                onRemove={handleItemRemove}
              />
            ))}

          {/* Display the confirmation modal if showModal is true */}
          {showModal && (
            <ConfirmModal
              header={MODAL.HEADER}
              message={MODAL.MESSAGE}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </Col>
      </Row>
      {/* Display the bottom bar with the total price if there are items in the cart */}
      {cart?.length > 0 ? (
        <BottomBar
          totalPrice={priceFormatter(getTotalPrice(), 1)}
          onClick={proceedToCheckout}
        ></BottomBar>
      ) : (
        // Display an empty cart message if there are no items in the cart and no error
        !error && <EmptyCart />
      )}
    </Container>
  )
}

export default Cart