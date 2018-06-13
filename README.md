[![Build Status](https://travis-ci.org/telemark/avtale-status.svg?branch=master)](https://travis-ci.org/telemark/avtale-status)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# avtale-status

Checks the status for agreements. Generate job files for updating.

## Setup

Change the [docker.env](docker.env) to match your environment.

```sh
NODE_ENV=production
DONE_DIRECTORY_PATH=test/directories/done
JOBS_DIRECTORY_PATH=test/directories/jobs
AGREEMENTS_JWT_SECRET=Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
AGREEMENTS_LOG_SEARCH_URL=https://log.service.no/agreements/search
AGREEMENTS_LOG_UPDATE_URL=https://log.service.no/agreements
SVARUT_JWT_SECRET=Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
SVARUT_SERVICE_URL=https://svarut.service.no
PAPERTRAIL_HOSTNAME=avtale-robot
PAPERTRAIL_HOST=logs.papertrailapp.com
PAPERTRAIL_PORT=12345
```
## Build

```sh
$ docker build -t avtale-status .
```

## Usage

```sh
$ docker run --env-file=docker.env --volume=/test/directories/jobs:/src/test/directories/jobs --rm avtale-status
```

This will start a container. Do the updates. Stop the container and remove it.

## License

[MIT](LICENSE)

![Robohash image of avtale-status](https://robots.kebabstudios.party/avtale-status.png "Robohash image of avtale-status")