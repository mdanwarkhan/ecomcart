import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f1f3f6;
    color: #333;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`
