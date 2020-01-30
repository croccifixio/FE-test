'use strict'
require('dotenv').config({ path: '../.env' })

const axios = require('axios')
const hapi = require('@hapi/hapi')
const R = require('ramda')
const JWT = require('jsonwebtoken')

const API_URL = process.env.API_URL
const COUNTRIES_ENDPOINT = process.env.COUNTRIES_ENDPOINT
const FRONTEND_PORT = process.env.FRONTEND_PORT
const FRONTEND_URL = process.env.FRONTEND_URL
const JWT_KEY = process.env.JWT_KEY
const SIGN_UP_ENDPOINT = process.env.SIGN_UP_ENDPOINT

axios.defaults.baseURL = API_URL

// In memory DB
let users = []

const generateJWT = (payload) => JWT.sign(payload, JWT_KEY, {algorithm: 'HS256'})

const isEmailInUse = (email) => !!R.find(R.propEq('email', email))(users)

const validate = async (decodedEmail) => ({ isValid: isEmailInUse(decodedEmail) })

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

  await server.register(require('./plugins/jwt'))
  server.auth.strategy('jwt', 'jwt', {
    key: JWT_KEY,
    validate,
  })

  server.auth.default('jwt')

  server.route([
    {
      method: "GET",
      path: "/",
      config: { auth: false },
      handler: function(request, h) {
        return {
          text: 'Token not required',
          token: generateJWT(people['1']),
        }
      }
    },
    {
      method: 'GET',
      path: '/restricted',
      config: { auth: 'jwt' },
      handler: function(request, h) {
        const response = h.response({text: 'You used a Token!'})
        response.header("Authorization", request.headers.authorization)
        return response
      }
    },
    {
      method: 'GET',
      config: { auth: false },
      path: `/${COUNTRIES_ENDPOINT}`,
      handler: async (request) => {
        try {
          const response = await axios.get(`/all?fields=capitallanguagesnameregiontopLevelDomain`)

          return response.data.map(processCountry)
        }
        catch (error) {
          return {
            err: `Unable to process request: ${error}`
          }
        }
      },
    },
    {
      method: 'GET',
      config: { auth: false },
      path: `/${COUNTRIES_ENDPOINT}/{name}`,
      handler: async (request) => {
        const { name } = request.params

        try {
          const response = await axios.get(`/name/${name}?fields=capitallanguagesnameregiontopLevelDomain`)

          return processCountry(response.data[0])
        }
        catch (error) {
          return {
            err: `Unable to process request: ${error}`
          }
        }
      },
    },
    {
      method: 'POST',
      config: { auth: false },
      path: `/${SIGN_UP_ENDPOINT}`,
      handler: async (request) => {
        const { payload } = request
        const user = JSON.parse(payload)

        if (isEmailInUse(user.email)) {
          return {
            success: false,
            err: `An account with the email ${user.email} already exists`,
          }
        }

        users = [...users, user]
        const token = generateJWT(user.email)

        return R.omit(['password'], {
          ...user,
          token,
          success: true,
        })
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
