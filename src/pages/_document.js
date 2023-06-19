import { Html, Head, Main, NextScript } from 'next/document'
import styled from "styled-components"

export default function Document() {
  return (
    <Html lang="pt-Br">
      <Head />
      <body>
        <Font>
          <Main />
          <NextScript />
        </Font>
      </body>
    </Html>
  )
}

const Font = styled.div`
  font-family: 'Roboto', sans-serif;
`
