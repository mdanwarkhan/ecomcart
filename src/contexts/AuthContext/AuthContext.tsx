import React, { createContext, ReactNode, useState } from 'react'
import { User } from '../../lib/types/User'

interface AuthContextType {
  isAuthenticated: boolean
  user?: User | null
  login: (user: User) => void
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}): React.ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null
    return user ? true : false
  })

  const login = (user: User) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      setIsAuthenticated(true)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {' '}
      {children}
    </AuthContext.Provider>
  )
}
