import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import useAuth from '../lib/hooks/useAuth'

jest.mock('../lib/hooks/useAuth')

describe('ProtectedRoute', () => {
    test('redirects to login if not authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false })

        const { getByText } = render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route path="/protected" element={<ProtectedRoute element={<div>Protected Page</div>} />} />
                </Routes>
            </MemoryRouter>
        )

        expect(getByText('Login Page')).toBeInTheDocument()
    })

    test('renders the element if authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true })

        const { getByText } = render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/protected" element={<ProtectedRoute element={<div>Protected Page</div>} />} />
                </Routes>
            </MemoryRouter>
        )

        expect(getByText('Protected Page')).toBeInTheDocument()
    })
})