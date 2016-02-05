FROM node

RUN mkdir -p /opt/service/musicbook
WORKDIR /opt/service/musicbook
COPY ./package.json ./package.json
COPY ./.bowerrc ./.bowerrc
COPY ./bower.json ./bower.json
RUN npm install --unsafe-perm

COPY ./src ./src
CMD npm start
