FROM node:20

WORKDIR /usr/src/todos

COPY . .

RUN npm install

ENV VITE_BACKEND_URL="http://localhost:3000"

CMD ["npm", "run", "dev", "--", "--host"]