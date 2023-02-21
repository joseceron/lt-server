# lt-server
 
# Description
 
This project is the server which is ment to manage companies information. The project is structured following good practices and oriented to be scalable to support high concurrent users.

 
#### Table of Contents
 
- [Server](#server)
	- [Installation](#installation)
	- [Quick Start](#quickstart)
	- [Server usage](#usageserver)
	- [Docker](#docker)
	- [Docs](#docs)
	- [What is included](#whatisincluded)
- [Frontend](#frontend)


 
# Server
 
#### Installation
- [Install nvm](https://github.com/nvm-sh/nvm) in order to use different versions of node

``` bash
# clone the repo
$ git https://github.com/joseceron/lt-server.git
 
# go into app's directory
$ cd lt-server
 
# use node version 12.13.0
$ nvm install 16.14.0
$ nvm use 16.14.0
 
# install app's dependencies
$ npm install
```
 
#### Quick Start
- Create `.env` file for environment variables: 
  - PORT
  - SENDGRID_API_KEY
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY


```
lt-server
├── .env         # environment variables file
├── src/            
└── package.json
...
```

#### Server usage in development mode
 
``` bash
# serve at localhost:8000 
npm start
 
# run unit tests
npm run test-watch
```
#### Server usage in production mode
 
``` bash
# build
npm run build
 
# start js
npm start-js
```

#### Docker
 
``` bash
# 1. clone image
docker pull dockerjctest1/lt-server
# OR 1. build image
docker build -t dockerHubUser/projectName .
 
# run 
docker run -d --rm -p 8000:8000 --name lt-server dockerjctest1/lt-server
 
# stop docker
docker stop lt-server

```


#### Documentation and design
- View User stories [here](https://docs.google.com/document/d/1nUGM23mCuj8YIQvfj1AnkwqHSUhSKrjELO8agde-994/edit?usp=sharing)
- View microservice API Gw architecture design [here](https://drive.google.com/file/d/1vJOWptVuA-MJS7tcu0_X0y2TazffuA9O/view?usp=sharing)
- Postman file [here](https://drive.google.com/file/d/1E5x-Dn5m6mp7vyoPTvPJEgLhVEmDlWBl/view?usp=sharing)


 
#### What is included

Within the download you will find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You will see something like this:

```
lt-server
│
├── src/             # project root
│   ├── application/          # application services folder
│        ├── useCases/          # use cases folder
│   ├── domain/               # domain model and services folder
│        ├── entities/
│        ├── exceptions/
│        ├── repositories/
│        ├── services/
│        ├── utils/
│   ├── infrastructure/      # infrastructure and apis folder
│        ├── driven-adapters/
│        ├── driving-adapters/
│        ├── implementations/
│        ├── tests/
│
├── .dockerignore/            # docker ignore files
├── .eslintrc.json/             # linter configuration
├── Dockerfile                  # docker commands
├── tsconfig.json              # compiler options
└── package.json              # libraries and scripts
```

## Frontend
- Go to this [repository](https://github.com/joseceron/lt-client) to execute the front end project

### Features and technologies
- AWS SDK
- Express, middleware: to set api logic and session authentication.
- moment: parse, validate, manipulate, and display dates and times in JavaScript.
- bcryptjs, uuid, eslint, nodemon, typescript, sendgrid, jsonwebtoken
- dotenv: loads environment variables from .env files
- jest, supertest: library for testing HTTP servers
- swagger-ui-express: for API documentation
- Persistance: DynamoDB and document client
- Microservices approach using onion architecture


**Table of Contents**

[TOCM]

[TOC]






