import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="My Meal Wizard" key="title"/>
        <meta property="og:description" content="built with buildspace" key="description"/>
        <meta
          property="og:image"
          content="https://cdn.buildspace.so/courses/gpt3-writer/project-og.jphttps://thenounproject.com/api/private/icons/657180/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjk9fKL1bKiYQfhXOu3DYbXuTjDF_-7KdvwpTDPws5EPw-py25S35CgEFuHIWxU_AwPSgadx-roqVM21ZklrDJbHv3yg%3D%3D"
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
