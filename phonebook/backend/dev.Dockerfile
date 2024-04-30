FROM node:20

WORKDIR /usr/src/phonebook

COPY --chown=node:node . .
RUN npm install

USER node
CMD ["npm", "run", "dev"]