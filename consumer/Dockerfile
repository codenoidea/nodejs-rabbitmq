FROM node:18-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD [ "npm", "run", "debug" ]