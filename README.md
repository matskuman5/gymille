## Running locally

Requires [Docker](https://www.docker.com/).

```
$ git clone https://github.com/matskuman5/gymille.git
```

### Production

```
$ cd gymille
$ docker compose up
```

Then navigate to http://localhost:5000/front. API requests can be made to http://localhost:5000/api.

### Development

First, run this shell script to start the Postgres database in a Docker container. You can inspect the database state with [psql](https://www.postgresql.org/docs/current/app-psql.html).

```
$ sh gymille/backend/src/test/db-start.sh
```

Then, in another terminal, start the backend server.

```
$ cd gymille/backend/
$ npm run dev
```

Finally, in a third terminal, start the frontend.

```
$ cd gymille/frontend/
$ npm run dev
```

The frontend can be accessed via http://localhost:5173/front, API requests via http://localhost:3000/api. The dev scripts use [Vite](https://vitejs.dev/) and [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) to restart the app whenever changes to the source code are detected.
