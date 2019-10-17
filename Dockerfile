FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
EXPOSE 3000
CMD ["node", "src/index.js"]
