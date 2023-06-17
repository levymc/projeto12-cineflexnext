import React from 'react';
import App from 'next/app';
import "../styles/globals.css";
import { SeatProvider } from './assentos/SeatContext';

function MyApp({ Component, pageProps }) {
  return (
    <SeatProvider>
      <Component {...pageProps} />
    </SeatProvider>
  );
}

export default MyApp;
