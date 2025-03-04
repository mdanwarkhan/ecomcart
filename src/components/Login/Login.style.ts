import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`

export const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
`

export const Heading = styled.h2`
  margin: 20px 0;
`

export const InputLabel = styled.label`
  font-weight: bold;
  padding 20px;
`

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const ErrorMessage = styled.div`
  color: red;
  margin-top: -15px;
  font-size: 14px;
  padding: 8px 2px;
`
