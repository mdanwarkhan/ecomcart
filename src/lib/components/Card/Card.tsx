import React from 'react'
import { priceFormatter } from '../../utils/priceFormatter'
import {
  Image,
  Title,
  CardContainer,
  Price,
  QuantityControls,
  CardLeft,
  CardRight,
} from './Card.style'
import { BUTTON } from '../../constants'
import { Button } from '../../styles/Button.style'
interface ItemProps {
  onIncrement: () => void
  onDecrement: () => void
  onRemove: (id: number) => void
  id: number
  title: string
  image: string
  price: number
  quantity: number
}

const Card: React.FC<ItemProps> = ({
  onIncrement,
  onDecrement,
  onRemove,
  id,
  price,
  title,
  image,
  quantity,
}) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <CardContainer>
      <CardLeft>
        <Image src={image} alt={title} />
        <QuantityControls>
          <Button
            type="primary"
            disabled={quantity < 2}
            onClick={onDecrement}
            onKeyDown={(e) => handleKeyDown(e, onDecrement)}
            aria-label="Decrease quantity"
          >
            {BUTTON.DECREMENT_BUTTON}
          </Button>
          <span>{quantity}</span>
          <Button
            type="primary"
            onClick={onIncrement}
            onKeyDown={(e) => handleKeyDown(e, onIncrement)}
            aria-label="Increase quantity"
          >
            {BUTTON.INCREMENT_BUTTON}
          </Button>
        </QuantityControls>
      </CardLeft>
      <CardRight>
        <Title>{title}</Title>
        <Price>{priceFormatter(price, quantity)}</Price>
        <Button
          type="outline"
          onKeyDown={(e) => handleKeyDown(e, () => onRemove(id))}
          onClick={() => onRemove(id)}
          aria-label={`Remove ${title}`}
        >
          {BUTTON.REMOVE_BUTTON}
        </Button>
      </CardRight>
    </CardContainer>
  )
}

export default Card
