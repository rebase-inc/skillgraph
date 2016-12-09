FROM alpine:3.3

RUN apk add --update \
    build-base \
    python \
    nodejs \
    rsync && \
    rm -rf /var/cache/apk/*

RUN mkdir -p /libs && mkdir -p /build

COPY . /libs 

WORKDIR /libs

RUN npm install npm@2 -g && \
    npm install pushstate-server -g && \
    npm install && \
    npm run build && \
    cp -r build/* /build/ && \
    rm -rf libs

CMD ["pushstate-server", "/build", "9000"]
