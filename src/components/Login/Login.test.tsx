import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'
import useAuth from '../../lib/hooks/useAuth'
import { BUTTON, LOGIN } from '../../lib/constants'

jest.mock('../../lib/hooks/useAuth')

describe('Login Component', () => {
  const mockLogin = jest.fn()

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin })
  })

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders login form', () => {
    expect(screen.getByText(LOGIN.HEADER)).toBeInTheDocument()
    expect(screen.getByLabelText(LOGIN.EMAIL_LABEL)).toBeInTheDocument()
    expect(screen.getByLabelText(LOGIN.PASSWORD_LABEL)).toBeInTheDocument()
    expect(screen.getByText(BUTTON.LOGIN_BUTTON)).toBeInTheDocument()
  })

  test('shows error messages for invalid form submission', () => {
    fireEvent.click(screen.getByText(BUTTON.LOGIN_BUTTON))

    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  test('calls login function with correct data on valid form submission', () => {
    fireEvent.change(screen.getByLabelText(LOGIN.EMAIL_LABEL), {
      target: { value: 'test@test.com' },
    })
    fireEvent.change(screen.getByLabelText(LOGIN.PASSWORD_LABEL), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByText(BUTTON.LOGIN_BUTTON))

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password123',
    })
  })
})
