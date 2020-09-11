FROM node

RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run buildLibrary
RUN npm run build

EXPOSE 4200/tcp

CMD npm run startProd