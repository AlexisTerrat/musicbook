mkdir -p $(pwd)/db
docker run -d --name musicbook-db \
  -v $(pwd)/db:/data/db \
  mongo

sleep 5
docker run -d --name musicbook-app \
  --link musicbook-db:db \
  -v $(pwd)/src/server:/opt/service/musicbook/src/server \
  -v $(pwd)/src/webapp/assets:/opt/service/musicbook/src/webapp/assets \
  -v $(pwd)/src/webapp/scripts:/opt/service/musicbook/src/webapp/scripts \
  -v $(pwd)/src/webapp/index.html:/opt/service/musicbook/src/webapp/index.html \
  -p 50000:80 \
  musicbook-app
