
FROM node:14
EXPOSE 3000

RUN mkdir -p /home/app
COPY . /home/app

RUN cd /home/app
RUN npm i

ENTRYPOINT [ "node", "/home/app/app.js" ]
