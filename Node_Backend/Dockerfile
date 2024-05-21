FROM node:latest

RUN mkdir -p home/expensebgt
WORKDIR /home/expensebgt

COPY . .



RUN npm install


EXPOSE 8080

CMD ["node","index"]


