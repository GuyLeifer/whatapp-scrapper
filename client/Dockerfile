FROM node:12

RUN ["mkdir", "/install"]

ADD ["./package.json", "/install"]

WORKDIR /install
RUN npm install
ENV NODE_PATH=/install/node_modules

WORKDIR /client

COPY . .

CMD ["npm", "run", "start"]