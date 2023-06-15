import React from 'react';
import App from 'next/app';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  // Executar lógica assíncrona, como carregar dados iniciais, aqui

  // Chamar o método `getInitialProps` do componente pai
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
