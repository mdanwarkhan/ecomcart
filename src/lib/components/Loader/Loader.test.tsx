import { render } from '@testing-library/react'
import Loader from './Loader'

describe('Loader', () => {
    test('should render LoaderContainer', () => {
        const { getByTestId } = render(<Loader />)
        expect(getByTestId('loader-container')).toBeInTheDocument()
    })

    test('should render Spinner', () => {
        const { getByTestId } = render(<Loader />)
        expect(getByTestId('spinner')).toBeInTheDocument()
    })
})