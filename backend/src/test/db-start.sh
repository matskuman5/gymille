#!/bin/sh
docker run -d --name testdb -e POSTGRES_PASSWORD=test -p 5432:5432 postgres
docker exec -it testdb psql -U postgres postgres