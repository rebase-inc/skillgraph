FROM node:alpine

RUN mkdir -p /usr/src/app && mkdir -p /usr/src/build
COPY . /usr/src/app
WORKDIR /usr/src/app

ARG REACT_APP_GITHUB_APP_CLIENT_ID

RUN npm install --quiet --depth -1 && \
    npm install --quiet --depth -1 pushstate-server -g && \
    npm run --silent build && \
    cp -r build/* /usr/src/build/ && \
    rm -rf /usr/src/app

CMD ["pushstate-server", "/usr/src/build", "9000"]
