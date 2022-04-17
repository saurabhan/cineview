import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { ListProvider } from '../utils/List-context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <NextUIProvider>
    <ListProvider>
    <Component {...pageProps} />
    </ListProvider>
  </NextUIProvider>
  )
}

export default MyApp
