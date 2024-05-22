# Discovery Server
Just another discovery server.

> **Note**
> 
> Before use this server you need to set your urls in `.env.example` by renaming to `.env`
>
> Bun by default will load `.env` to your code

## Installation tutorial
To install dependencies:
```bash
bun install
```

To run:

```bash
bun run source/server.ts
```

## PM2 Settings
I used PM2 for automatic start, btw if you want to use another tool you're free, but if you'll use
PM2, here is a basic config.
```bash
pm2 start --interpreter ~/.bun/bin/bun source/server.ts --name discovery
```