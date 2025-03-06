import React from 'react'
import { LoaderContainer, Spinner } from './Loader.style'

const Loader: React.FC = () => {
  return (
    <LoaderContainer data-testid="loader-container">
      <Spinner data-testid="spinner" />
    </LoaderContainer>
  )
}

export default Loader
