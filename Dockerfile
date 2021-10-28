FROM node:10.13.0-slim

ARG BUILD_CONTEXT
ENV BUILD_CONTEXT ${BUILD_CONTEXT}

RUN mkdir /app
WORKDIR /app

COPY *.json /app/
RUN npm install

COPY ./ /app

RUN npm run build

CMD [ "npm", "run", "start" ]
