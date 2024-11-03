FROM node:18-alpine as base
WORKDIR /app

FROM node:18-alpine AS build
WORKDIR /src
COPY . .
RUN npm ci -w back
RUN npm run build:back
