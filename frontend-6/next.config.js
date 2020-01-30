require('dotenv').config({ path: '../.env' })

const withStylus = require('@zeit/next-stylus')

module.exports = withStylus({
  env: {
    BACKEND_PORT: process.env.BACKEND_PORT,
    BACKEND_URL: process.env.BACKEND_URL,
    LOGIN_ENDPOINT: process.env.LOGIN_ENDPOINT,
  }
})
