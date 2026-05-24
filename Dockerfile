FROM registry.fedoraproject.org/fedora-minimal AS docs

# we do not use the python base image as the git version bundled does not support sparse-checkout
RUN microdnf -y --nodocs install git python

RUN mkdir -p /opt/app/content
WORKDIR /opt/app

RUN python -m pip --disable-pip-version-check --quiet install poetry

COPY poetry.lock pyproject.toml /opt/app/
RUN poetry install --no-dev

COPY bin /opt/app/bin
COPY config.toml /opt/app/
RUN poetry run python bin/website docs pull

FROM docker.io/node:current-alpine AS build

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json package-lock.json /opt/app/
RUN npm ci

COPY . .
COPY --from=docs /opt/app/content/docs /opt/app/content/docs

RUN npm run prod

FROM docker.io/peaceiris/hugo:latest AS hugo

COPY --from=build /opt/app /opt/app

WORKDIR /opt/app
RUN hugo --minify

FROM docker.io/nginx:alpine

COPY --from=hugo /opt/app/public /usr/share/nginx/html
