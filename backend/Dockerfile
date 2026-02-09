FROM node:18-alpine

WORKDIR /backend

COPY package.json package-lock.json .

COPY ./backend .

RUN npm ci

EXPOSE 5000

CMD ["node", "index.js"]