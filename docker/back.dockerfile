FROM node:18-alpine as base
WORKDIR /app

FROM node:18-alpine AS build
WORKDIR /src
COPY . .
RUN npm ci -w back
RUN npm run build:back

FROM build as publish
WORKDIR /publish
RUN cp -r /src/back/dist /publish

FROM base as final
COPY --from=publish /publish/* /app
RUN npm i --prod
EXPOSE 80
ENTRYPOINT ["node","index.js"]
