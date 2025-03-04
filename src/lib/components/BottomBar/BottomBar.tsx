import React, { memo } from 'react'
import { BottomBarContainer, Total } from './BottomBar.style'
import { BOTTOMBAR, BUTTON } from '../../constants'
import { Button } from '../../styles/Button.style'

interface BottomBarProps {
  totalPrice: string
  onClick: () => void
}
const BottomBar: React.FC<BottomBarProps> = ({ totalPrice, onClick }) => {
  // throw new Error('Not implemented')

  return (
    <BottomBarContainer>
      <Total>
        {BOTTOMBAR.TOTAL} {totalPrice}
      </Total>
      <Button type="secondary" onClick={onClick}>
        {BUTTON.CHECKOUT_BUTTON}
      </Button>
    </BottomBarContainer>
  )
}

export default memo(BottomBar)
