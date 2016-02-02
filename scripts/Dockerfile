FROM node

RUN mkdir -p /opt/services/musicbook
WORKDIR /opt/services/musicbook
COPY ./package.json ./package.json
RUN npm install

COPY ./app ./app
WORKDIR /opt/services/musicbook/app
CMD node main.js
