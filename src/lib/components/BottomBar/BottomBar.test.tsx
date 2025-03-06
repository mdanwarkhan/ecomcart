import { render, screen, fireEvent } from '@testing-library/react'
import BottomBar from './BottomBar'
import { BOTTOMBAR, BUTTON } from '../../constants'

describe('BottomBar Component', () => {
  const mockOnClick = jest.fn()
  const totalPrice = '100'

  beforeEach(() => {
    render(<BottomBar totalPrice={totalPrice} onClick={mockOnClick} />)
  })

  test('renders the total price', () => {
    const totalElement = screen.getByText(`${BOTTOMBAR.TOTAL}: ${totalPrice}`)
    expect(totalElement).toBeInTheDocument()
  })

  test('renders the checkout button', () => {
    const buttonElement = screen.getByText(BUTTON.CHECKOUT_BUTTON)
    expect(buttonElement).toBeInTheDocument()
  })

  test('calls onClick when the button is clicked', () => {
    const buttonElement = screen.getByText(BUTTON.CHECKOUT_BUTTON)
    fireEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
