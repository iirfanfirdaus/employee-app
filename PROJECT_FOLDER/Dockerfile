FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8000
CMD ["node", "app.js"]