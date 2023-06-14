# Stage 1: Compiler

FROM node:18-alpine AS compiler

WORKDIR /usr/src/app

# Copy necessary files for installing packages and compilation
COPY package.json .
COPY tsconfig.json .
COPY src ./src

# Install TypeScript so we can compile
RUN npm install typescript

# Compile the app into ./dist
RUN npm run build

# Stage 2: Production

# Alpine Linux to optimize image size
FROM node:18-alpine AS production

# Improve performance by running node in production mode
ENV NODE_ENV production

# For security, run the app as least-privileged user
USER node

WORKDIR /usr/src/app

# Copy info about scripts and packages
# package-lock.json is needed to run npm ci
COPY package.json .
COPY package-lock.json .

# Deterministically install only packages needed for production
RUN npm ci --only=production

# Copy compiled code from compiler stage
COPY --from=compiler /usr/src/app/dist ./dist

# Finally, run the compiled server.js
CMD [ "node", "dist/server.js" ]