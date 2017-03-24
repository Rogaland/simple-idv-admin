# Setting the base to nodejs 7.7.3
FROM node:7.7.3-alpine

# Maintainer
MAINTAINER Frode Sjovatsen


COPY . /server
WORKDIR /server
RUN npm install && npm run buildClient && npm run cleanModules && npm install --production

RUN ls -lag /server
# Startup
ENTRYPOINT npm start