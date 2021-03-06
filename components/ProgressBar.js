import React from 'react'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

const ProgressBar = () => (
  <Head>
    <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
    <link rel='stylesheet' type='text/css' href='/static/weather-icons/css/weather-icons.css' />
    <meta name='viewport' content='width=device-width, user-scalable=no' />
  </Head>
)

export default ProgressBar
