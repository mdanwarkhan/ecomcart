import styled from 'styled-components'

export const BottomBarContainer = styled.div`
  background-color: #fff;
  border-top: 1px solid #ccc;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 300px;
  }
`

export const Total = styled.h3`
  flex: 1;
`
