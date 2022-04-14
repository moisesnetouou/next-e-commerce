import type { AppProps } from 'next/app'
import { CartProvider } from '../hooks/useCart';
import {Header} from '../components/Header';
import GlobalStyles from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
