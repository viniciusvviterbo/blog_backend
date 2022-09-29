FROM node:latest

WORKDIR /app

COPY ./package*.json ./
COPY ./src ./src

EXPOSE 4400

RUN npm install --omit=dev
CMD ["npm", "start"]
