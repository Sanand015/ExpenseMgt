FROM node:alpine
 
RUN mkdir -p user/src/expensebgtfrontend
WORKDIR user/src/expensebgtfrontend

COPY . /user/src/expensebgtfrontend

COPY . .

RUN npm install
RUN npm i axios
RUN npm I bootstrap
RUN npm i react-router-dom

 
EXPOSE 3000