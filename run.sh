docker run -d --name musicbook-db \
  -e POSTGRES_DB=database \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  postgres
  #-v $(pwd)/volumes/db:/var/lib/postgresql/data \

sleep 5
docker run -d --name musicbook-app \
  --link musicbook-db:db \
  -v $(pwd)/src/webapp/assets:/opt/service/musicbook/src/webapp/assets \
  -v $(pwd)/src/webapp/scripts:/opt/service/musicbook/src/webapp/scripts \
  -p 50000:8080 \
  musicbook-app
