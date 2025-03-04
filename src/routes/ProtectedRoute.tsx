import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../lib/hooks/useAuth'

export const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{element}</>
}
