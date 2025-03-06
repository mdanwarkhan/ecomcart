import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../lib/components/Navbar/Navbar'
import { ProtectedRoute } from './ProtectedRoute'
import Login from '../components/Login/Login'
const Cart = React.lazy(() => import('../components/Cart/Cart'))

const AppRoutes: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute
              element={
                <h1 style={{ display: 'flex', justifyContent: 'center' }}>
                  Home
                </h1>
              }
            />
          }
        />
        <Route
          path="/cart/:cartId"
          element={<ProtectedRoute element={<Cart />} />}
        />
        <Route path="*" element={<Navigate to={'login'} />} />
      </Routes>
    </>
  )
}

export default AppRoutes
