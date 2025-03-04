import { render, screen, act } from '@testing-library/react'
import { AuthProvider, AuthContext } from './AuthContext'
import { User } from '../../lib/types/User'

describe('AuthContext', () => {
  const mockUser: User = { email: 'john@example.com', password: 'test123' }

  beforeEach(() => {
    localStorage.clear()
  })

  test('should initialize with isAuthenticated false if no user in localStorage', () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => (
            <div>
              {value?.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </div>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    )
    expect(screen.getByText('Not Authenticated')).toBeInTheDocument()
  })

  test('should initialize with isAuthenticated true if user in localStorage', () => {
    localStorage.setItem('user', JSON.stringify(mockUser))
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => (
            <div>
              {value?.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </div>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    )
    expect(screen.getByText('Authenticated')).toBeInTheDocument()
  })

  test('login should set isAuthenticated to true and store user in localStorage', () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => (
            <div>
              <button onClick={() => value?.login(mockUser)}>Login</button>
              {value?.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </div>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    act(() => {
      screen.getByText('Login').click()
    })

    expect(screen.getByText('Authenticated')).toBeInTheDocument()
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockUser))
  })

  test('logout should set isAuthenticated to false and remove user from localStorage', () => {
    localStorage.setItem('user', JSON.stringify(mockUser))
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => (
            <div>
              <button onClick={() => value?.logout()}>Logout</button>
              {value?.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </div>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    act(() => {
      screen.getByText('Logout').click()
    })

    expect(screen.getByText('Not Authenticated')).toBeInTheDocument()
    expect(localStorage.getItem('user')).toBeNull()
  })
})
