# # Frontend Dockerfile
# FROM node:18 AS base
# WORKDIR /usr/src/app

# # Install pnpm
# RUN corepack enable && corepack prepare pnpm@latest --activate

# # Build Stage
# FROM base AS build
# COPY pnpm-lock.yaml ./
# COPY package.json ./
# RUN pnpm install
# COPY . .
# RUN pnpm build

# # Production Stage
# FROM nginx:alpine
# # Ensure the "dist" directory is copied to Nginx's html directory
# COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Frontend Dockerfile
# # Frontend Dockerfile
FROM node:18 AS base
WORKDIR /usr/src/app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Build Stage
FROM base AS build
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm build

# Production Stage
FROM nginx:alpine
# Ensure the "dist" directory is copied to Nginx's html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

################

# Dockerfile for React client

# FROM node:18
# WORKDIR /app
# RUN corepack enable && corepack prepare pnpm@latest --activate
# COPY ./package.json ./package.json
# COPY ./public ./public
# COPY ./src ./src
# RUN pnpm install
# EXPOSE 3000
# CMD ["pnpm","start"]