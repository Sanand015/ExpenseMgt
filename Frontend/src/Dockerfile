FROM node:alpine
 
RUN mkdir -p user/src/expensemgtfrontend
WORKDIR user/src/expensemgtfrontend

COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY . ./

 
EXPOSE 3000

CMD ["npm", "start"]