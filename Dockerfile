FROM alpine:3.4

RUN apk add --update build-base python nodejs rsync && \
    rm -rf /var/cache/apk/* && \
    cd $(npm root -g)/npm  && \
    npm install fs-extra && \
    sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

COPY package.json /deps/package.json

WORKDIR /deps

RUN npm install npm@2 -g && \
    npm install

WORKDIR /code

CMD ["/code/start", "start"]
