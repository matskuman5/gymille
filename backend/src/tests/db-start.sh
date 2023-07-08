#!/bin/sh

if docker container ls -a --filter name=testdb --format '{{.Names}}' | grep -q '^testdb$';
then
    docker start testdb
else
    docker run -d --name testdb -e POSTGRES_PASSWORD=test -p 5432:5432 postgres
fi
if docker container ls -a --filter name=redistest --format '{{.Names}}' | grep -q '^redistest$';
then
    docker start redistest
else
    docker run -d --name redistest -p 6379:6379 -it redis/redis-stack-server:latest
fi
sleep 1s # wait for postgres to start up before connecting to it
docker exec -it testdb psql -U postgres postgres