FROM node

RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run buildLibrary
RUN npm run build

EXPOSE 4200/tcp

CMD npm run start