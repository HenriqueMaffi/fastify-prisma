import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import fjwt from 'fastify-jwt-deprecated'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import userRoutes from "./modules/user/user.route"
import productRoutes from "./modules/product/product.route"
import {userSchemas} from './modules/user/user.schema'
import {productSchemas} from './modules/product/product.schema'
import {version} from '../package.json'

export const server = Fastify()

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any
  }
}

declare module "fastify-jwt-deprecated"{
  interface FastifyJWT{
    user: {
      id: number,
      email: string,
      name: string
  }
}
}


server.register(fjwt, {
  secret: "ashdvbfaksjdbfoailsdjzxnckbvdfgnsjkdfgnklsjbgj"
})

server.decorate(
  "authenticate", 
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      return reply.send(error)
    }
})


server.get('/healthcheck', async function() {
  return{status:'OK'}
})


async function main(){

  for(const schema of [...userSchemas, ...productSchemas]){
    server.addSchema(schema)
  }

  const swaggerOptions = {
    swagger: {
      info: {
        title: "FastifyAPI",
        description: "API for some products",
        version,
      },
      host: "localhost",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "Default", description: "Default" }],
    }    
  }

  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
    staticCSP: true
};

  server.register(fastifySwagger, swaggerOptions)
  server.register(fastifySwaggerUi, swaggerUiOptions)
  

  server.register(userRoutes, {prefix: 'api/users'})
  server.register(productRoutes, {prefix: 'api/products'})

  try {
    await server.listen({port: 3000})

    console.log('Server ready at htt://localhost:3000')
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

main()