FROM node:20  

ENV SERVICE_PORT 3001
ENV SRC_DIR /tmp/src

COPY src ${SRC_DIR}
ARG CACHEBUST=1
WORKDIR ${SRC_DIR}

RUN apt update && apt upgrade -y
RUN npm install yarn
RUN yarn global add forever
RUN yarn global add nodemon

EXPOSE ${SERVICE_PORT}

CMD ["yarn", "dev"]
