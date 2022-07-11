FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app

EXPOSE 8080
CMD [ "npm", "start" ]