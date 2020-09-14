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
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/krossr-client /usr/share/nginx/html

# Stage 3: Go
CMD ["nginx", "-g", "daemon off;"]
