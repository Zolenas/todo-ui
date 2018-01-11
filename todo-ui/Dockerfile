FROM node:8-alpine

LABEL maintainer="Frederic Faure <frederik.faure@gmail.com> (https://github.com/Zolenas)"

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
