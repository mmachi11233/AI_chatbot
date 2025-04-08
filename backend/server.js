'use strict'

const { Ignitor } = require('@adonisjs/ignitor')

// Set up and fire the HTTP server
new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)
