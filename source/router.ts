import { Hono, type Context } from "hono";
import { js2xml } from "xml-js";

export const Router = new Hono()

function endpoint(c: Context): Response {
    const res_data = {
        _declaration: {
            _attributes: {
                version: "1.0"
            }
        },
        result: {
            has_error: 0,
            version: 1,
            endpoint: {
                host: process.env.HOST,
                api_host: process.env.API_HOST,
                portal_host: process.env.PORTAL_HOST,
                n3ds_host: process.env.N3DS_HOST
            }
        }
    };

    if (c.req.header()["accept"] === "application/json") {
        return c.json(res_data, 200);
    }
    
    const res = js2xml(res_data, {compact: true, spaces: 2});
    return new Response(res, {status: 200, headers: {
        "Content-Type": "application/xml"
    }})

}

Router.get('/endpoint', endpoint);

Router.get('/v1/endpoint', endpoint)

Router.get('/', endpoint)
