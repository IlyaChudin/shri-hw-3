FROM node:lts-alpine
RUN apk add --no-cache git
COPY package*.json ./
COPY lerna.json ./
COPY packages/build-agent ./packages/build-agent
COPY packages/shared ./packages/shared
RUN npm i
RUN npx lerna bootstrap
ENTRYPOINT ["node", "packages/build-agent/src/app.js"]
