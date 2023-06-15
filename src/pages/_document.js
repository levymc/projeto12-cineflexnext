import { Html, Head, Main, NextScript } from 'next/document'
import ResetStyle from '../style/ResetStyle';
import GlobalStyle from '../style/GlobalStyle';

export default function Document() {
  return (
    <Html lang="en">
      <ResetStyle />
      <GlobalStyle />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
