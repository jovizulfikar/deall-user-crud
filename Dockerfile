FROM node:19-slim

RUN apt-get update && apt-get -y install openssl
WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install
COPY ./prisma .
RUN npx prisma generate
COPY . .
ENV NODE_ENV=production
EXPOSE 8000
CMD [ "yarn", "start" ]
