import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../lib/hooks/useAuth'
import { Button } from '../../lib/styles/Button.style'
import { BUTTON, LOGIN } from '../../lib/constants'
import {
  ErrorMessage,
  FormContainer,
  Form,
  Heading,
  InputField,
  InputLabel,
} from './Login.style'
import { useForm } from 'react-hook-form';
import { User } from '../../lib/types/User'

const Login: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, formState: { errors } } = useForm<User>()

  const from = location.state?.from?.pathname || '/'

  const handleLogin = (data: User) => {
    login(data)
    navigate(from, { replace: true })
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Heading>{LOGIN.HEADER}</Heading>
        <InputLabel htmlFor="email">{LOGIN.EMAIL_LABEL} </InputLabel>
        <InputField
          {...register('email', {
            required: LOGIN.EMAIL_ERROR_REQUIRED, pattern: {
              value: LOGIN.EMAIL_PATTERN,
              message: LOGIN.EMAIL_ERROR_INVALID,
            },
          })}
          id="email"
          placeholder={LOGIN.EMAIL_PLACEHOLDER}
          aria-label="Email"
        />

        <ErrorMessage role='alert' aria-live='assertive'>{errors.email?.message}</ErrorMessage>

        <InputLabel htmlFor="password">{LOGIN.PASSWORD_LABEL}</InputLabel>
        <InputField
          {...register('password', {
            required: LOGIN.PASSWORDL_ERROR_REQUIRED, minLength: {
              value: 6,
              message: LOGIN.PASSWORD_ERROR_INVALID
            }
          })}
          id="password"
          type='password'
          placeholder={LOGIN.PASSWORD_PLACEHOLDER}
          aria-label="Password"
        />
        <ErrorMessage role='alert' aria-live='assertive'>{errors.password?.message}</ErrorMessage>
        <Button type="primary">{BUTTON.LOGIN_BUTTON}</Button>
      </Form>
    </FormContainer>
  )
}

export default Login
