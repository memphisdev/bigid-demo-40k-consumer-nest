FROM node:16.13.2-alpine
WORKDIR /consumer
COPY . ./
RUN apk add python3
RUN npm i -g @nestjs/cli
RUN npm install --silent
CMD ["npm", "run", "start"]