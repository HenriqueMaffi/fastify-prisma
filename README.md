# REST API with Fastify & Prisma

## Technologies

- Fastify
- Prisma
- Zod
- Swagger
- TypeScript

## Tools needed

- [Postman](https://www.postman.com/) - Make API requests
- [Prisma studio](https://www.prisma.io/studio) - View data
- [PostreSQL or MySQL](https://github.com/tomanagle/awesome-docker-compose) - Database

## Features

- Create a user
- Login
- List users
- Create a product
- List products
- Authentication
- Request & response validation
- Swagger docs

## dependencies

npm i @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt fastify-swagger

## devDependencies

npm i ts-node-dev typescript @types/node --dev

## Initialise prisma

npx prisma init --datasource-provider postgresql

### Migrate the schema

npx prisma migrate dev --name init

# Testing

## What are we testing with?

- [Node Tap](https://node-tap.org/) - Test framework
- [fastify.inject](https://www.fastify.io/docs/latest/Guides/Testing/#benefits-of-using-fastifyinject) - Inject HTTP requests
- [faker-js](@faker-js/faker) - Generate test data
- [ts-mock-imports](https://www.npmjs.com/package/ts-mock-imports) - Mock imports

## Postman routes

- Import the Fastify-Prisma.postman_collection.json file into Postman as raw text
- Create an environment with a variable 'host', type default, and initial and current value as 'http://localhost:3000'
