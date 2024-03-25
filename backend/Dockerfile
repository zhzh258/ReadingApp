FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Make port 3001 available to the world outside this container
EXPOSE 3001
ENV NODE_ENV production

CMD ["npm", "start"]