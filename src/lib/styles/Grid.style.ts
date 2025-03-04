import { styled } from 'styled-components'

export const Container = styled.div`
  padding: 15px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`

interface ColProps {
  size: number
  children: React.ReactNode
}

export const Col = styled.div<ColProps>`
  flex: ${(props) =>
    props.size ? `1 1 calc(${(100 / 12) * props.size}% - 30px)` : '1 1 100%'};
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  padding-bottom: 30px;
`
