// import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { NextUIProvider, createTheme, CssBaseline } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode'

import NavbarHeader from '../libs/components/NavbarHeader'
import Head from 'next/head';


function MyApp({ Component, pageProps:{session, ...pageProps} }) {

  const lightTheme = createTheme({
    type: 'light',
    // theme: {
    //   colors: {...},
    // }
  })
  const darkTheme = createTheme({
    type: 'dark',
    // theme: {
    //   colors: {...},
    // }
  })
  const darkMode = useDarkMode(false);
  return (
  <SessionProvider session={session}>
  {/* <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}> */}
  <NextUIProvider theme={darkTheme}>
  <Head>{CssBaseline.flush()}</Head>
  <NavbarHeader />
  <Component {...pageProps} />
  </NextUIProvider>
  </SessionProvider>
  )
}

export default MyApp
