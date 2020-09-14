# Stage 1: Build
FROM node as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc
COPY . /app
RUN npm run buildLibrary
RUN npm run buildProd

# Stage 2: Setup
FROM nginx
ARG NGINX_API_PROXY
COPY nginx/default.conf.template /etc/nginx/default.conf.template
RUN envsubst < /etc/nginx/default.conf.template > /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/krossr-client /usr/share/nginx/html

EXPOSE 80/tcp

# Stage 3: Go
CMD ["nginx", "-g", "daemon off;"]
