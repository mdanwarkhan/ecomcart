import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 400px;
`

export const ModalMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
