FROM node:carbon

WORKDIR /usr/src/app

# install node dependencies
COPY package*.json ./
RUN npm install && npm run build

# copy source
COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
