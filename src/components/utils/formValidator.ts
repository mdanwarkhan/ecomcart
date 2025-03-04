import { LOGIN } from '../../lib/constants'

export const validateForm = (email: string, password: string): FORMERRORS => {
  const newErrors: FORMERRORS = {}
  if (!email) {
    newErrors.email = LOGIN.EMAIL_ERROR_REQUIRED
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = LOGIN.EMAIL_ERROR_INVALID
  }

  if (!password) {
    newErrors.password = LOGIN.PASSWORDL_ERROR_REQUIRED
  } else if (password.length < 6) {
    newErrors.password = LOGIN.PASSWORD_ERROR_INVALID
  }

  return newErrors
}
