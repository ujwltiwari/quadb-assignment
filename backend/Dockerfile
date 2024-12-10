# # Backend Dockerfile
# # Base Image
# FROM node:18 AS base
# WORKDIR /usr/src/app

# # Install pnpm
# RUN corepack enable && corepack prepare pnpm@latest --activate

# # Development Stage
# FROM base AS development
# COPY pnpm-lock.yaml ./
# COPY package.json ./
# RUN pnpm install
# COPY . .
# EXPOSE 3000
# CMD ["pnpm", "dev"]

# # Production Stage
# FROM base AS production
# COPY pnpm-lock.yaml ./
# COPY package.json ./
# RUN pnpm install --prod
# COPY . .
# EXPOSE 3000
# CMD ["pnpm", "dev"]

#####################

FROM node:18
WORKDIR /app
COPY ./package.json ./package.json
COPY ./app.js ./app.js
COPY . . 
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install 
EXPOSE 9000
CMD ["node", "app.js"]