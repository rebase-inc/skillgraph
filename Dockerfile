FROM alpine:3.3
RUN apk add --update build-base python nodejs rsync && \
    rm -rf /var/cache/apk/*
COPY package.json /deps/package.json
WORKDIR /deps
RUN npm install npm@2 -g && \
    npm install
WORKDIR /code
CMD ["/code/start", "start"]
