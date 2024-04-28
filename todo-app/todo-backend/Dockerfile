FROM node:20

WORKDIR /usr/src/todos

COPY --chown=node:node . .
RUN npm ci

ENV DEBUG=todo-backend:*

USER node
CMD npm start