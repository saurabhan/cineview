import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'

import { ListProvider } from '../utils/List-context'
import Navbar from '../components/Navbar/Navbar'
import { AuthProvider } from '../utils/AuthContext'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <ListProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer/>
        </ListProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}

export default MyApp
