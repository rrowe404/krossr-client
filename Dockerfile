# Stage 1: Build
FROM node as builder

WORKDIR /app
COPY package*.json ./
RUN npm install && \
    npx ngcc
COPY . /app
RUN npm run buildLibrary && \
    npm run buildProd

# Stage 2: Setup
FROM nginx
RUN apk add --update npm
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/krossr-client /usr/share/nginx/html

# Stage 3: Go
CMD ["nginx", "-g", "daemon off;"]
