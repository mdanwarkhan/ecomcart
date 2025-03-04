import React from 'react'
import { ErrorFallbackCotainer } from './ErrorFallback.style'
import { BUTTON, ERROR_BOUNDARY } from '../../constants'
import { Button } from '../../styles/Button.style'
import { ErrorText } from '../../styles/Error.style'

interface ErrorFallbackProps {
  error?: null | Error
  resetErrorBoundary?: () => void
}
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <ErrorFallbackCotainer>
      <ErrorText>{ERROR_BOUNDARY.HEADING}</ErrorText>
      <h3>{error?.message}</h3>
      <Button type="outline" onClick={resetErrorBoundary}>
        {BUTTON.RESET_BUTTON}
      </Button>
    </ErrorFallbackCotainer>
  )
}

export default ErrorFallback
