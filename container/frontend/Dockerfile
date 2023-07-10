FROM node:lts-buster-slim

WORKDIR /cost_men

ADD ./frontend/package.json ./
ADD ./frontend/package-lock.json ./

RUN npm install
ADD . /cost_men