# Setting the base to nodejs 7.7.3
FROM node:7.7.3-alpine

# Maintainer
MAINTAINER Frode Sjovatsen


COPY . /src
WORKDIR /src
RUN npm install && npm run buildClient && npm run cleanModules && npm install --production

COPY . /server
WORKDIR /server

# Startup
ENTRYPOINT npm start