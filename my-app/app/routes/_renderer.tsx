import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'
import { Footer } from "../components/layouts/Footer";

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.PROD ? (
          <link href='/static/assets/style.css' rel='stylesheet' />
        ) : (
          <link href='/app/style/style.css' rel='stylesheet' />
        )}
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="/app/client.ts" async />
        <Style />


      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
})
