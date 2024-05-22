import { Hono } from "hono";
import { logger } from "hono/logger";
import { Router } from "./router";
const app = new Hono();

app.use('*', logger())
app.route('/', Router);

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT,
})

console.log("Server started in port ", process.env.PORT);
