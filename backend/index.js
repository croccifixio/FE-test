'use strict'
require('dotenv').config({ path: '../.env' })

const axios = require('axios')
const hapi = require('@hapi/hapi')
const R = require('ramda')

const API_URL = process.env.API_URL
const COUNTRIES_ENDPOINT = process.env.API_URL
const FRONTEND_PORT = process.env.FRONTEND_PORT
const FRONTEND_URL = process.env.FRONTEND_URL

axios.defaults.baseURL = API_URL

const processCountry = (country) => {
  const {
    capital,
    languages,
    name,
    region,
    topLevelDomain,
  } = country

  return {
    capital,
    continent: region,
    languages: R.pluck('name')(languages),
    name,
    tlds: topLevelDomain,
  }
}

const init = async () => {
  const server = hapi.server({
    port: '3000',
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

        try {
          const response = await axios.get(`/name/${name}?fields=capital;languages;name;region;topLevelDomain`)

          return processCountry(response.data[0])
        }
        catch (error) {
          return {
            err: `Unable to process request: ${error}`
          }
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
