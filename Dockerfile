# Stage 1: Build
FROM node:22 as builder

ARG NODE_ENV
ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
ARG PUPPETEER_EXECUTABLE_PATH
RUN echo $NODE_ENV

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN echo $NODE_ENV
RUN npm run build

# Stage 2: Setup
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/krossr-client/browser /usr/share/nginx/html

# Stage 3: Go
CMD ["nginx", "-g", "daemon off;"]
