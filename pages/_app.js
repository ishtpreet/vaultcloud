import '../styles/globals.css'
import { NextUIProvider, createTheme, CssBaseline } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode'

import NavbarHeader from '../components/NavbarHeader'
import Head from 'next/head';


function MyApp({ Component, pageProps }) {

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
  <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
  <Head>{CssBaseline.flush()}</Head>
  <NavbarHeader />
  <Component {...pageProps} />
  </NextUIProvider>
  )
}

export default MyApp
