import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavbarContainer = styled.nav`
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  width: 100%;
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #ccc;
`

export const NavLinkContainerLeft = styled.div`
  display: flex;
  gap: 10px;
`

export const Seperator = styled.div`
  margin: 0 5px:
`

export const NavLink = styled(Link)`
  &:hover {
    color: darkgray;
  }
`
