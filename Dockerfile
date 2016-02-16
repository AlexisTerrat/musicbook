FROM node

RUN mkdir -p /opt/service/musicbook
WORKDIR /opt/service/musicbook
COPY ./package.json ./package.json
COPY ./.bowerrc ./.bowerrc
COPY ./bower.json ./bower.json
COPY ./src ./src
RUN npm install --unsafe-perm
CMD npm start
