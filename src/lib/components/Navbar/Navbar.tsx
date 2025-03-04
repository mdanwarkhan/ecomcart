import React from 'react'
import { useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import {
  NavbarContainer,
  NavLinkContainerLeft,
  NavLink,
  Seperator,
} from './Navbar.style'

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const { pathname } = useLocation()

  const renderNavLinks = () => {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        {!pathname.includes('cart') && (
          <>
            <Seperator>|</Seperator>
            <NavLink to="/cart/2">Cart</NavLink>
          </>
        )}
      </>
    )
  }

  return (
    isAuthenticated && (
      <NavbarContainer>
        <NavLinkContainerLeft>{renderNavLinks()}</NavLinkContainerLeft>
        <div>
          <NavLink to="/login" onClick={logout}>
            Logout
          </NavLink>
        </div>
      </NavbarContainer>
    )
  )
}

export default Navbar
