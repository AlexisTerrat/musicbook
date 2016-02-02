docker run -d --name musicbook-db \
  -e POSTGRES_DB=database \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  postgres

sleep 4

docker run -d --name musicbook-app \
  --link musicbook-db:db \
  -p 8080:8080 \
  musicbook-app
