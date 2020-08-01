FROM node:13.12.0-alpine
WORKDIR /React
ENV PATH /React/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]