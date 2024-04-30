FROM node:20 AS build-stage
WORKDIR /usr/src/todos

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL="http://localhost:8080/api/"

RUN npm run test
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/todos/dist /usr/share/nginx/html

