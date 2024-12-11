FROM node:18
WORKDIR /app
COPY ./package.json ./package.json
COPY ./app.js ./app.js
COPY . . 
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install 
EXPOSE 3000
CMD ["node", "app.js"]