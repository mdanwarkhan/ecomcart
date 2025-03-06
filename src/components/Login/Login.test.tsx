import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'
import { BUTTON, LOGIN } from '../../lib/constants'
import useAuth from '../../lib/hooks/useAuth'

jest.mock('../../lib/hooks/useAuth')

const mockLogin = jest.fn()

describe('Login Component', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin })
  })

  test('renders login form', () => {

    expect(screen.getByText(LOGIN.HEADER)).toBeInTheDocument()
    expect(screen.getByLabelText(LOGIN.EMAIL_LABEL)).toBeInTheDocument()
    expect(screen.getByLabelText(LOGIN.PASSWORD_LABEL)).toBeInTheDocument()
    expect(screen.getByText(BUTTON.LOGIN_BUTTON)).toBeInTheDocument()
  })

  test('shows error messages on invalid form submission', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByText(BUTTON.LOGIN_BUTTON))

    expect(await screen.findByText(LOGIN.EMAIL_ERROR_REQUIRED)).toBeInTheDocument()
    expect(await screen.findByText(LOGIN.PASSWORDL_ERROR_REQUIRED)).toBeInTheDocument()
  })

  test('calls login function on valid form submission', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.input(screen.getByLabelText(LOGIN.EMAIL_LABEL), {
      target: { value: 'test@test.com' }
    })
    fireEvent.input(screen.getByLabelText(LOGIN.PASSWORD_LABEL), {
      target: { value: 'test123' }
    })

    fireEvent.click(screen.getByText(BUTTON.LOGIN_BUTTON))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'test123'
      })
    })
  })
})