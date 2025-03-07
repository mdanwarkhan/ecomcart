import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Cart from './Cart'
import { useCart } from '../../lib/hooks/useCart'

jest.mock('../../lib/hooks/useCart')

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>

describe('Cart Component', () => {
  beforeEach(() => {
    mockUseCart.mockReturnValue({
      cart: [
        { id: 1, title: 'Product 1', image: 'p1.jpg', quantity: 5, price: 100 },
        { id: 2, title: 'Product 2', image: 'p2.jpg', quantity: 2, price: 200 },
      ],
      updateProductQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      getTotalPrice: jest.fn().mockReturnValue(500),
      isLoading: false,
      error: null,
      setCartId: jest.fn(),
    })
  })

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    )
  })

  test('renders cart items', () => {
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  test('increments product quantity', () => {
    const incrementButtons = screen.getAllByText('+')
    fireEvent.click(incrementButtons[0])

    expect(mockUseCart().updateProductQuantity).toHaveBeenCalledWith(1, 1)
  })

  test('decrements product quantity', () => {
    const decrementButtons = screen.getAllByText('-')
    fireEvent.click(decrementButtons[0])

    expect(mockUseCart().updateProductQuantity).toHaveBeenCalledWith(1, -1)
  })

  test('removes product from cart', () => {
    const removeButtons = screen.getAllByText('Remove')
    fireEvent.click(removeButtons[0])

    expect(
      screen.getByText('Are you sure you want to remove this item?')
    ).toBeInTheDocument()
  })

  test('shows empty cart message when cart is empty', () => {
    mockUseCart.mockReturnValueOnce({
      ...mockUseCart(),
      cart: [],
    })

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    )

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  test('displays total price of the cart', () => {
    expect(screen.getByText('Total: ₹500.00')).toBeInTheDocument()
  })

  test('handles loading state', () => {
    mockUseCart.mockReturnValueOnce({
      ...mockUseCart(),
      isLoading: true,
    })

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('handles error state', () => {
    mockUseCart.mockReturnValueOnce({
      ...mockUseCart(),
      error: {
        isAxiosError: true,
        response: undefined,
        name: '',
        message: '',
        toJSON: function (): object {
          throw new Error('network Error')
        }
      },
    })

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    )

    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument()
  })
})
