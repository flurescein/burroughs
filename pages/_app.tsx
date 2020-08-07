import Head from 'next/head'

import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Берроуз</title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-96785093-4"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'UA-96785093-4');
        `
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
