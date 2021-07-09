
FROM node:14
EXPOSE 3000
WORKDIR .
COPY . .
RUN npm i
ENTRYPOINT [ "node", "app.js" ]
