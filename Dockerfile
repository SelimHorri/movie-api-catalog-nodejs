
FROM node:14

RUN mkdir -p /home/app
COPY . /home/app

RUN npm i /home/app/package.json

EXPOSE 3000
CMD [ "node", "/home/app/app.js" ]
