FROM node:18-alpine AS base
WORKDIR /app

FROM node:18-alpine AS build
WORKDIR /src
COPY . .
RUN npm ci -w back
RUN npm run build:back

FROM build AS publish
WORKDIR /publish
RUN cp -r /src/back/dist /publish

FROM base AS final
COPY --from=publish /publish/* /app
RUN npm i --omit=dev
EXPOSE 80
ENTRYPOINT ["node","index.js"]
