module.exports = (app) ->
  Logger = require '../../lib/logger'
  log = new Logger
  express = require 'express'

  app.use express.compress
    filter: (req, res) ->
      (/json|text|javascript|css/).test res.getHeader 'Content-Type'
    level: 9

  app.use express.static __dirname + '/../../public'
  app.configure ->
    app.use express.cookieParser()
    app.use express.json()
    app.use express.urlencoded()
    app.use express.methodOverride()

    app.use app.router
