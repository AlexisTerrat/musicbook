docker stop musicbook-app
docker rm -v musicbook-app
docker build -t musicbook-app .
docker run -d --name musicbook-app \
  --link musicbook-db:db \
  -v $(pwd)/src/server:/opt/service/musicbook/src/server \
  -v $(pwd)/src/webapp/assets:/opt/service/musicbook/src/webapp/assets \
  -v $(pwd)/src/webapp/scripts:/opt/service/musicbook/src/webapp/scripts \
  -v $(pwd)/src/webapp/index.html:/opt/service/musicbook/src/webapp/index.html \
  -p 50000:8080 \
  musicbook-app
