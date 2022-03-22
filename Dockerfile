FROM node:17

WORKDIR /usr/src/app
COPY . .
RUN npm install -g prisma typescript
COPY /node_modules/.prisma /usr/src/app/node_modules
RUN npm install
RUN npm install node-sass

RUN tsc -p tsconfig.json
RUN cp -R /usr/src/app/src/public /usr/src/app/dist/src
RUN cp -R /usr/src/app/src/client /usr/src/app/dist/src
EXPOSE 4000

CMD ["npm", "run","run-all"]