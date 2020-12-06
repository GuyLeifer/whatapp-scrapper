FROM node:12

RUN ["mkdir", "/install"]

ADD ["./package.json", "/install"]

WORKDIR /install
RUN npm install
ENV NODE_PATH=/install/node_modules

WORKDIR /server

ADD /wait_for_it.sh /server/wait_for_it.sh
RUN chmod +x /server/wait_for_it.sh

COPY . .

CMD ["npm", "run", "dev"]