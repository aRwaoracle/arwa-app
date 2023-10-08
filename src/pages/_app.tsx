import { ReactNode, Suspense } from 'react';
import { AppProps } from 'next/app';
import { Orbitron } from 'next/font/google';
import { Meta } from '@components/meta';

import Loading from '@/components/Loading';
import Web3Provider from '@/providers/Web3Provider';

import '../styles/global.css';

// eslint-disable-next-line new-cap
const orbitron = Orbitron({ weight: '400', subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps): ReactNode {
  return (
    <main className={orbitron.className}>
      <Meta />
      <Suspense fallback={<Loading />}>
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
      </Suspense>
    </main>
  );
}

export default MyApp;
