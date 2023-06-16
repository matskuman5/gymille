# Stage 1: Build the frontend
FROM node:latest AS builder

WORKDIR /usr/src/app

# Copy necessary files for building and compiling
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY index.html .
COPY vite.config.ts .
COPY .env.production .
COPY src ./src

# Install dependencies
RUN npm ci

# Build the app into ./dist
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.24.0-alpine

# Copy built static files and config to Nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Run the app
CMD [ "nginx", "-g", "daemon off;" ]