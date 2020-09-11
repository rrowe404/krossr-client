FROM node

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npx ngcc
RUN npm run buildLibrary
RUN npm run build

EXPOSE 4200/tcp

CMD npm run startProd