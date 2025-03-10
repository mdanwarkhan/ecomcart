import React, { createContext, useState } from 'react'
import { User } from '../../lib/types/User'
import { AuthContextType, AuthProviderProps } from '../../lib/types/Auth'

// Create the context with an undefined default value
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

  // Function to log in the user
  const login = (user: User) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      setIsAuthenticated(true)
    }
  }

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  // Provide the context values to the children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}