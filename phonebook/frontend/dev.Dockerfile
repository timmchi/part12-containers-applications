FROM node:20

WORKDIR /usr/src/phonebook
COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]