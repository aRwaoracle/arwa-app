import { ReactNode } from 'react';
import { AppProps } from 'next/app';
import { Orbitron } from 'next/font/google';

import '../styles/global.css';

// eslint-disable-next-line new-cap
const orbitron = Orbitron({ weight: '400', subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps): ReactNode {
  return (
    <main className={orbitron.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
