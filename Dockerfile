FROM node:18-alpine

WORKDIR /usr/src/client

COPY package.json .
RUN npm install

COPY . .
RUN npm run-script build
CMD npm run-script start