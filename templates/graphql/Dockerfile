FROM node:8.11
ENV NODE_ENV production
WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

COPY . /app
EXPOSE 8040

CMD [ "npm", "start" ]