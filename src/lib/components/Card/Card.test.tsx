import { render, fireEvent } from '@testing-library/react'
import Card from './Card'
import { BUTTON } from '../../constants'

describe('Card Component', () => {
  const mockIncrement = jest.fn()
  const mockDecrement = jest.fn()
  const mockRemove = jest.fn()

  const defaultProps = {
    onIncrement: mockIncrement,
    onDecrement: mockDecrement,
    onRemove: mockRemove,
    id: 1,
    title: 'Test Product',
    image: 'test-image.jpg',
    price: 100,
    quantity: 1,
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders Card component with correct props', () => {
    const { getByText, getByAltText } = render(<Card {...defaultProps} />)

    expect(getByText('Test Product')).toBeInTheDocument()
    expect(getByAltText('Test Product')).toHaveAttribute(
      'src',
      'test-image.jpg'
    )
    expect(getByText(BUTTON.DECREMENT_BUTTON)).toBeInTheDocument()
    expect(getByText(BUTTON.INCREMENT_BUTTON)).toBeInTheDocument()
    expect(getByText(BUTTON.REMOVE_BUTTON)).toBeInTheDocument()
  })

  test('calls onIncrement when increment button is clicked', () => {
    const { getByLabelText } = render(<Card {...defaultProps} />)
    fireEvent.click(getByLabelText('Increase quantity'))
    expect(mockIncrement).toHaveBeenCalledTimes(1)
  })

  test('calls onDecrement when decrement button is clicked', () => {
    const { getByLabelText } = render(<Card {...defaultProps} quantity={2} />)
    fireEvent.click(getByLabelText('Decrease quantity'))
    expect(mockDecrement).toHaveBeenCalledTimes(1)
  })

  test('calls onRemove when remove button is clicked', () => {
    const { getByLabelText } = render(<Card {...defaultProps} />)
    fireEvent.click(getByLabelText(`Remove Test Product`))
    expect(mockRemove).toHaveBeenCalledTimes(1)
    expect(mockRemove).toHaveBeenCalledWith(1)
  })

  test('decrement button is disabled when quantity is less than 2', () => {
    const { getByLabelText } = render(<Card {...defaultProps} quantity={1} />)
    expect(getByLabelText('Decrease quantity')).toBeDisabled()
  })

  test('renders correct price based on quantity', () => {
    const { getByText } = render(<Card {...defaultProps} quantity={3} />)
    expect(getByText('₹300.00')).toBeInTheDocument()
  })

  test('handles keyboard events for increment button', () => {
    const { getByLabelText } = render(<Card {...defaultProps} />)
    fireEvent.keyDown(getByLabelText('Increase quantity'), { key: 'Enter' })
    expect(mockIncrement).toHaveBeenCalledTimes(1)
  })

  test('handles keyboard events for decrement button', () => {
    const { getByLabelText } = render(<Card {...defaultProps} quantity={2} />)
    fireEvent.keyDown(getByLabelText('Decrease quantity'), { key: 'Enter' })
    expect(mockDecrement).toHaveBeenCalledTimes(1)
  })

  test('handles keyboard events for remove button', () => {
    const { getByLabelText } = render(<Card {...defaultProps} />)
    fireEvent.keyDown(getByLabelText('Remove Test Product'), { key: 'Enter' })
    expect(mockRemove).toHaveBeenCalledTimes(1)
    expect(mockRemove).toHaveBeenCalledWith(1)
  })
})
