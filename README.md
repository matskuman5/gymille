# [Gymille!](https://gymille-frontend.fly.dev/front) - a simple workout tracker webapp

Track your workouts exercise by exercise, see your progress week by week. Create session templates to fill in sessions quickly. Register and log in to save your sessions and session templates server-side, or try the app before and store data locally. You can even run the entire app on your own computer using a single command!

# Stack

The entire app is written in [TypeScript](https://www.typescriptlang.org/), with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) taking care of linting and opinionated code formatting. E2E-testing is done using [Cypress](https://www.cypress.io/). The frontend and backend are hosted as separate instances in [fly.io](https://fly.io/), or locally in [Docker](https://www.docker.com/) containers. Testing and deployment is automated with [GitHub Actions](https://github.com/features/actions).

The frontend is a [React](https://react.dev/) app built with [Vite](https://vitejs.dev/). HTTP requests to the backend are handled by [Axios](https://axios-http.com/), using [React Query](https://tanstack.com/query/latest/) for asynchronous state management and data fetching logic. The main component and styling library used is [Material UI](https://mui.com/).

The backend is a REST API implemented with [Node](https://nodejs.org/en) that uses [Express](https://expressjs.com/) for HTTP requests. Database stuff is handled with [Sequelize](https://sequelize.org/), along with [Umzug](https://github.com/sequelize/umzug) for migrations and seed data. Unit and integration tests use [Jest](https://jestjs.io/).

User, session and session template data is stored in a [PostgreSQL](https://www.postgresql.org/) database running either locally in a Docker container or remotely in a fly.io instance. Browser session data is similarly stored in [Redis](https://redis.io/).

# Running locally

Requires [Docker](https://www.docker.com/).

```
$ git clone https://github.com/matskuman5/gymille.git
```

## Production

```
$ cd gymille
$ docker compose up
```

Then navigate to http://localhost:5000/front. API requests can be made to http://localhost:5000/api.

## Development

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
