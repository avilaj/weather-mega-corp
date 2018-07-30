import React from 'react'

import Head from 'next/head'

import Link from 'next/link'

import NProgress from 'nprogress'

import Router from 'next/router'


Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

const Cities = ({ cities }) => (
    <div>
        <Head>
            <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
        </Head>
        <ul>
            {cities.map((city) => (
                <li key={city.id}>
                    <Link as={`/${city.id}`} href={`/weather?city=${city.id}`}>
                        <a>{city.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Cities;