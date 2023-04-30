// import '../styles/globals.css'
'use client';
import { SessionProvider } from "next-auth/react"
import { NextUIProvider, createTheme, CssBaseline } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode'
import "nprogress/nprogress.css";
import dynamic from 'next/dynamic'

import NavbarHeader from '../libs/components/NavbarHeader'
import Head from 'next/head';
import '../styles/globals.css'


const TopProgressBar = dynamic(
  () => {
    return import("libs/components/TopProgressBar");
  },
  { ssr: false },
);

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
  <NextUIProvider theme={darkTheme}>
  <TopProgressBar />
  <SessionProvider session={session}>
  {/* <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}> */}
  <Head>{CssBaseline.flush()}</Head>
  <NavbarHeader />
  <Component {...pageProps} />
  </SessionProvider>
  </NextUIProvider>
  )
}

export default MyApp
