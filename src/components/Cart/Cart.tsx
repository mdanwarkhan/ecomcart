import { useCart } from '../../lib/hooks/useCart'
import Card from '../../lib/components/Card/Card'
import ConfirmModal from '../../lib/components/ConfirmModal/ConfirmModal'
import { useCallback, useEffect, useState } from 'react'
import Loader from '../../lib/components/Loader/Loader'
import BottomBar from '../../lib/components/BottomBar/BottomBar'
import { priceFormatter } from '../../lib/utils/priceFormatter'
import { errorFormatter } from '../../lib/utils/errorFormatter'
import { useParams } from 'react-router-dom'
import { MODAL } from '../../lib/constants'
import { Col, Container, Row } from '../../lib/styles/Grid.style'
import { ErrorText } from '../../lib/styles/Error.style'
import EmptyCart from '../../lib/components/EmptyCart/EmptyCart'

function Cart() {
  const [showModal, setShowModal] = useState(false)
  const [productId, setProductId] = useState<number | null>(null)
  const { cartId } = useParams<{ cartId: string }>()
  const {
    cart,
    updateProductQuantity,
    removeFromCart,
    getTotalPrice,
    isLoading,
    error,
    setCartId,
  } = useCart()

  useEffect(() => {
    if (cartId) {
      setCartId(Number(cartId))
    }
  }, [cartId, setCartId])

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

  const handleItemRemove = (id: number) => {
    setShowModal(true)
    setProductId(id)
  }

  const handleConfirm = () => {
    if (productId !== null) {
      removeFromCart(productId)
    }
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Container>
      <Row>
        <Col size={12}>
          {error instanceof Error && (
            <ErrorText>{errorFormatter(error)}</ErrorText>
          )}
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
      {cart?.length > 0 ? (
        <BottomBar
          totalPrice={priceFormatter(getTotalPrice(), 1)}
          onClick={proceedToCheckout}
        ></BottomBar>
      ) : (
        !error && <EmptyCart />
      )}
    </Container>
  )
}

export default Cart
