FROM node:10.9.0-alpine
LABEL maintainer=rrequero@gmail.com

ENV NAME kube-workshop
ENV USER kube-workshop

RUN apk update && apk upgrade && \
    apk add --no-cache --update bash git openssh python alpine-sdk

RUN addgroup $USER && adduser -s /bin/bash -D -G $USER $USER

RUN mkdir -p /opt/$NAME
COPY package.json /opt/$NAME/package.json
RUN cd /opt/$NAME && npm install

WORKDIR /opt/$NAME

COPY ./nodemon.json /opt/$NAME/nodemon.json
COPY ./database /opt/$NAME/database
COPY ./src /opt/$NAME/src
RUN chown $USER:$USER /opt/$NAME/src
RUN chown $USER:$USER /opt/$NAME/database

# Tell Docker we are going to use this ports
EXPOSE 3000
USER $USER

CMD ["npm", "start"]