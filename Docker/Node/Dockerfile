FROM node:latest as build-stage

WORKDIR /app

COPY . /app

EXPOSE 80

RUN npm install
RUN npm run dev