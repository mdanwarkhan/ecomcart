import React from 'react'
import cartImage from '../../assets/empty-cart.png'
import { EmptyCartContainer } from './EmptyCart..style'
import { BUTTON, EMPTY_CART } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../styles/Button.style'

const EmptyCart: React.FC = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate(`/cart/1`)
  }
  return (
    <EmptyCartContainer>
      <h2>{EMPTY_CART.HEADING}</h2>
      <p>{EMPTY_CART.MESSAGE}</p>
      <img src={cartImage} alt="Empty cart" />
      <Button type="primary" onClick={handleLogin}>
        {BUTTON.ADD_PRODUCT_BUTTON}
      </Button>
    </EmptyCartContainer>
  )
}

export default EmptyCart
