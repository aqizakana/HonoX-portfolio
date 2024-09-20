import { css } from 'hono/css'
import { serveStatic } from "@hono/node-server/serve-static";
import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { Hono } from "hono"

export const app = new Hono();
app.use('/public/*', serveStatic({ root: './public' }))

const className = css`
    font-family: "Raleway", HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    
`

export default createRoute((c) => {
    const name = c.req.query('name') ?? 'Hono'

    return c.render(
        <div class={"title_back"}>
            <div class={className}>
                <h1 class={"TITLE"}>Shinnnosuke UoTA</h1>
            </div>
            <a href="/articles/create">
                <img src='/static/logo.png'
                    width={100}
                    height={100}
                    alt="logo"
                    className='md:h-60 md:w-60 sm:h-30 sm:w-30 OGImage img_gradient' />
                <h2 class={"hovering md:h-60 md:w-60"}>Click Logo!</h2>
            </a>

        </div>
    )
})