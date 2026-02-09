FROM node:18-alpine

WORKDIR /server

COPY package.json package-lock.json vite.config.js ./

COPY ./server .

RUN npm ci

COPY ./frontend ./frontend

RUN npm run build

CMD ["node", "index.js"]