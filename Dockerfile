FROM oven/bun:latest as base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/ .
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
EXPOSE 80/tcp
ENTRYPOINT [ "bun", "run", "source/server.ts" ]