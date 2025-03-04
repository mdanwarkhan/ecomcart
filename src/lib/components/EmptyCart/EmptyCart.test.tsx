import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import EmptyCart from './EmptyCart'
import { EMPTY_CART, BUTTON } from '../../constants'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

describe('EmptyCart Component', () => {
  beforeEach(() => {
    render(<MemoryRouter>
      <EmptyCart />
    </MemoryRouter>)
  })
  test('renders heading and message', () => {
    expect(screen.getByText(EMPTY_CART.HEADING)).toBeInTheDocument()
    expect(screen.getByText(EMPTY_CART.MESSAGE)).toBeInTheDocument()
  })

  test('renders image with alt text', () => {
    const image = screen.getByAltText('Empty cart')
    expect(image).toBeInTheDocument()
  })

  test('renders button and handles click', () => {
    const button = screen.getByText(BUTTON.ADD_PRODUCT_BUTTON)
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/cart/1`)
  })
})
