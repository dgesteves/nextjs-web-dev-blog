import Head from 'next/head'

import '../styles/globals.css'
import Layout from '../components/layout/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Blog about NextJS</title>
        <meta name='description' content='Blog about NextJS.' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
