import { ReactNode } from 'react';
import { AppProps } from 'next/app';

import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps): ReactNode {
  return <Component {...pageProps} />;
}

export default MyApp;
