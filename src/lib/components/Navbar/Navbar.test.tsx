import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'
import useAuth from '../../hooks/useAuth'
const mockedUseLocation = require('react-router-dom').useLocation

jest.mock('../../hooks/useAuth')
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}))

describe('Navbar', () => {
    beforeEach(() => {
        mockedUseAuth.mockReturnValue({
            isAuthenticated: true,
            login: jest.fn(),
            logout: jest.fn(),
        })
    })

    test('renders Home link', () => {
        mockedUseLocation.mockReturnValue({ pathname: '/' })
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )
        expect(screen.getByText('Home')).toBeInTheDocument()
    })

    test('renders Cart link when not on cart page', () => {
        mockedUseLocation.mockReturnValue({ pathname: '/' })
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )
        expect(screen.getByText('Cart')).toBeInTheDocument()
    })

    test('does not render Cart link when on cart page', () => {
        mockedUseLocation.mockReturnValue({ pathname: '/cart' })
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )
        expect(screen.queryByText('Cart')).not.toBeInTheDocument()
    })
})