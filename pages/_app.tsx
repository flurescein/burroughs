import Head from 'next/head'
import { useEffect } from 'react'

import preloadImages from '../lib/preloadImages'

import '../styles/globals.css'

const iconPaths = [
  'add',
  'archive',
  'copy',
  'cut',
  'edit',
  'resave',
  'save',
  'trash'
].map(iconName => `icons/${iconName}.svg`)

const analyticsID = process.env.analyticsID

export default function MyApp({ Component, pageProps }) {
  useEffect(() => preloadImages(iconPaths), [])

  return (
    <>
      <Head>
        <title>Берроуз</title>
        {analyticsID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', '${analyticsID}');
                `
              }}
            />
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
