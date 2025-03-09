FROM node:18-alpine AS base
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Beirut /etc/localtime && \
    echo "Asia/Beirut" > /etc/timezone && \
    apk del tzdata
EXPOSE 80
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
ENTRYPOINT ["node","index.js"]
