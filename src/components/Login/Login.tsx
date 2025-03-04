import React, { useState } from 'react'
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
import { validateForm } from '../utils/formValidator'

const Login: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FORMERRORS>({})

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm(email, password)
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      const user = { email, password }
      login(user)
      navigate(from, { replace: true })
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={handleLogin}>
        <Heading>{LOGIN.HEADER}</Heading>
        <InputLabel htmlFor="email">{LOGIN.EMAIL_LABEL} </InputLabel>
        <InputField
          id="email"
          type="email"
          placeholder={LOGIN.EMAIL_PLACEHOLDER}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <InputLabel htmlFor="password">{LOGIN.PASSWORD_LABEL}</InputLabel>
        <InputField
          id="password"
          type="password"
          placeholder={LOGIN.PASSWORD_PLACEHOLDER}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <Button type="primary">{BUTTON.LOGIN_BUTTON}</Button>
      </Form>
    </FormContainer>
  )
}

export default Login
