import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="My Meal Wizard" key="title"/>
        <meta property="og:description" content="built with buildspace" key="description"/>
        <meta
          property="og:image"
          content="https://hosting.photobucket.com/images/i/joecdouglas2/wizard_logo.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
