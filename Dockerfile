#simple angular-cli docker installation
#docker build -t ng-cli .
#or specify angular-cli version
#docker build --build-arg NG_CLI_VERSION=7.0.3

FROM node:stretch

#alternative to reduce size instead of alpine, but does not
#include build tools for native compilation of npm packages
#FROM node:8-slim

MAINTAINER Aristoteles

ARG NG_CLI_VERSION=7.0.3
ARG USER_HOME_DIR="/tmp"
ARG APP_DIR="/app"
ARG USER_ID=1000
ARG ENVIRONMENT=dev

ENV HTTP_BACKEND="db"

USER root

ENV NPM_CONFIG_LOGLEVEL warn

#angular-cli rc0 crashes with .angular-cli.json in user home
ENV HOME "$USER_HOME_DIR"

# npm 5 uses different userid when installing packages, as workaround su to node when installing
# see https://github.com/npm/npm/issues/16766
RUN set -xe \
    && curl -sL https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 > /usr/bin/dumb-init \
    && chmod +x /usr/bin/dumb-init \
    && mkdir -p $USER_HOME_DIR \
    && chown $USER_ID $USER_HOME_DIR \
    && chmod a+rw $USER_HOME_DIR \
    && chown -R node /usr/local/lib /usr/local/include /usr/local/share /usr/local/bin \
    && npm install -g node-gyp \
    && (cd "$USER_HOME_DIR"; su node -c "npm install -g @angular/cli@$NG_CLI_VERSION; npm install -g yarn; chmod +x /usr/local/bin/yarn; npm cache clean --force")

#not declared to avoid anonymous volume leak
#VOLUME "$USER_HOME_DIR/.cache/yarn"
#VOLUME "$APP_DIR/"
WORKDIR $APP_DIR

COPY ./ /$APP_DIR

RUN npm install grpc
RUN npm install
RUN ng build

EXPOSE 4200

#ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ng serve --host 0.0.0.0 --$ENVIRONMENT
