import { render, screen, fireEvent } from '@testing-library/react'
import ErrorFallback from './ErrorFallback'
import { BUTTON, ERROR_BOUNDARY } from '../../constants'

describe('ErrorFallback', () => {
  const error = new Error('Test error')
  const resetErrorBoundary = jest.fn()

  beforeEach(() => {
    render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    )
  })

  test('renders the error message and reset button', () => {
    expect(screen.getByText(ERROR_BOUNDARY.HEADING)).toBeInTheDocument()
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.getByText(BUTTON.RESET_BUTTON)).toBeInTheDocument()
  })

  test('calls resetErrorBoundary when reset button is clicked', () => {
    fireEvent.click(screen.getByText(BUTTON.RESET_BUTTON))
    expect(resetErrorBoundary).toHaveBeenCalledTimes(1)
  })
})
