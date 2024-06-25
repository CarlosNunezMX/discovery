import { Hono } from "hono";
import { logger } from "hono/logger";
import { Router } from "./router";
const app = new Hono();

app.use("*", (c, next) => {
    c.header("X-Dispatch", "Olive::Web::Discovery::V1::Endpoint-index")
    return next()
});
app.use('*', logger())
app.route('/', Router);

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT,
})

console.log("Server started in port ", process.env.PORT);
