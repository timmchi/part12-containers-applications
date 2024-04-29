FROM node:20

WORKDIR /usr/src/todos

COPY --chown=node:node . .
RUN npm install

ENV DEBUG=todo-backend:*

USER node
CMD ["npm", "run", "dev"]