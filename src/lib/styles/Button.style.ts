import { styled } from 'styled-components'

type ButtonType = 'primary' | 'secondary' | 'danger' | 'success' | 'outline'

interface ButtonProps {
  type: ButtonType
  children: React.ReactNode
}

export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => (props.type === 'outline' ? 'black' : 'white')};
  font-weight: 400;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s;
  text-transform: uppercase;

  background-color: ${(props) => {
    switch (props.type) {
      case 'primary':
        return '#007BFF'
      case 'secondary':
        return '#6C757D'
      case 'danger':
        return '#DC3545'
      case 'success':
        return '#28A745'
      default:
        return '#fff'
    }
  }};
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #f8f8f8;
    pointer-events: none;
    color: gray;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px 1px rgba(67, 70, 72, 0.5);
    transform: scale(1.05);
  }
`
