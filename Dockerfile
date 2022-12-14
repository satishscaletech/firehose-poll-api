FROM node:lts-buster AS dependencies
WORKDIR /app
RUN apt update 
COPY package.json . 
COPY package-lock.json .
RUN npm install 

FROM node:lts-buster AS build-project 
WORKDIR /app 
COPY . . 
RUN npm run build 

FROM node:lts-buster-slim 
WORKDIR /app 
COPY --from=build-project /app/node_modules node_modules
COPY --from=build-project /app/dist .
EXPOSE 8000

CMD ["node", "main.js"]