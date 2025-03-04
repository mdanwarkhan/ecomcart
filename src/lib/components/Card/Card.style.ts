import styled from 'styled-components'

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  background-color: #fff;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const CardLeft = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`

export const CardRight = styled.div`
  flex: 7;
  padding-left: 15px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;

  Button:nth-child(3) {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    Button:nth-child(3) {
      margin-top: 15px;
    }
  }
`

export const Image = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 8px;
`

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
`

export const Price = styled.p`
  font-size: 16px;
  color: #444;
  flex: 1;
  width: 100%;
`

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`
