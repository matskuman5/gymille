# [Gymille!](https://gymille-frontend.fly.dev/front) - a simple workout tracker webapp

Track your workouts exercise by exercise, see your progress week by week. Create session templates to fill in sessions quickly. Register and log in to save your sessions and session templates server-side, or try the app before and store data locally. You can even run the entire app on your own computer using a single command!

# Instructions

You can navigate throughout the app using the sidebar. The sidebar is open by default on desktop, or you can hit the icon in the top left on mobile to open it.

Save a new workout session in the "New Session" page, which should be open by default. You can add multiple exercises to the session by clicking "Add Exercise". When you're done, click "Submit" to save the session.

You can see saved sessions in the "Previous Sessions" page. Click the arrow button on the left of the session name to show more info.

Create session templates in the "Session Templates" page. Click "New" to create a new template, then hit "Edit" next to its name to add exercise templates to it and hit "Confirm" to save changes. In the "New Session" page, you can use the template selector in the top left to load exercises to the current session from the selected template.

In the "Preferences" page, you can adjust the weight unit from kilograms to pounds as well as enable dark mode.

Create an account or log in by entering a unique username and a password at least 8 characters long. Once logged in, any sessions or session templates you add will be stored in the backend server, so they are synchronized across devices and even if you clear local browser data. You can log out, change your password or delete your account (including all stored data) using the appropriate buttons in the sidebar.

# Stack

The entire app is written in [TypeScript](https://www.typescriptlang.org/), with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) taking care of linting and opinionated code formatting. E2E-testing is done using [Cypress](https://www.cypress.io/). The frontend and backend are hosted as separate instances in [fly.io](https://fly.io/), or locally in [Docker](https://www.docker.com/) containers. Testing and deployment is automated with [GitHub Actions](https://github.com/features/actions).

The frontend is a [React](https://react.dev/) SPA built with [Vite](https://vitejs.dev/), with [React Router](https://reactrouter.com/en/main) to handle client side routing. HTTP requests to the backend are handled by [Axios](https://axios-http.com/), using [React Query](https://tanstack.com/query/latest/) for asynchronous state management and data fetching logic. The main component and styling library used is [Material UI](https://mui.com/).

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

# Time used to develop

In [time-used.md](time-used.md), you can find a diary of the amount of time I used to develop the app and what I used the time to do. The entire app from start to finish took about 90 hours of work, not including planning and research.

# Licence

This project is licenced under the GNU General Public License v3.0.
