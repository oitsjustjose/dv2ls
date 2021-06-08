FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production
RUN npx browserslist --update-db

COPY . .

RUN npm run build

##

FROM node:14-alpine AS server

ENV NODE_ENV=production

RUN npm install -g serve

WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/build ./build

ENV PORT=3003

EXPOSE 3003
USER node
CMD ["serve", "-s", "build"]
