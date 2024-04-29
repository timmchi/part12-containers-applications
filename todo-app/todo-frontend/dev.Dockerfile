FROM node:20

WORKDIR /usr/src/todos

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]