FROM node:latest as build-stage

WORKDIR /app

COPY . /app

EXPOSE 5173

RUN npm install
RUN npm run dev