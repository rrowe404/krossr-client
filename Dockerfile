# Stage 1: Build
FROM node:14 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install && \
    npx ngcc
COPY . /app
RUN echo $NODE_ENV
RUN npm run build

# Stage 2: Setup
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/krossr-client /usr/share/nginx/html

# Stage 3: Go
CMD ["nginx", "-g", "daemon off;"]
