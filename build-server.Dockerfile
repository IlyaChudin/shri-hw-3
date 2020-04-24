FROM node:lts-alpine
RUN apk add --no-cache git
COPY package*.json ./
COPY lerna.json ./
COPY packages/build-server ./packages/build-server
COPY packages/shared ./packages/shared
RUN npm i
RUN npx lerna bootstrap
ENTRYPOINT ["node", "packages/build-server/src/app.js"]
