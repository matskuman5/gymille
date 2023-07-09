#!/bin/sh

docker stop testdb
docker stop redistest

docker rm testdb
docker rm redistest