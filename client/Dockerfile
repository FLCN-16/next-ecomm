FROM node:16-alpine

WORKDIR /app/client
ENV PATH /app/client/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/client/package.json

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]