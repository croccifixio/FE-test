'use strict'
require('dotenv').config({ path: '../.env' })

const hapi = require('@hapi/hapi')

const API_URL = process.env.API_URL
const COUNTRIES_ENDPOINT = process.env.API_URL
const FRONTEND_PORT = process.env.FRONTEND_PORT
const FRONTEND_URL = process.env.FRONTEND_URL
const PORT = process.env.BACKEND_PORT

const init = async () => {
  const server = hapi.server({
    port: PORT,
    host: '0.0.0.0',
    routes: {
      cors: false,
    },
  })

  server.route([
    {
      method: 'GET',
      path: '/countries/{name}',
      handler: async (request) => {
        const { name } = request.params

        return {
          name,
        }
      },
    },
  ])

  await server.register({
    plugin: require('hapi-cors'),
    options: {
      origins: [
        `${FRONTEND_URL}:${FRONTEND_PORT}`,
      ],
    },
  })
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (error) => {
    console.error(error)
    process.exit(1)
})

init()
