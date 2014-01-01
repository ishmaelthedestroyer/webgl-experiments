argv = require('optimist').argv

# init express + app
express = require 'express'
app = express()

# set environment
if argv.environment? && argv.environment is 'production'
  process.env.NODE_ENV = 'production'
else
  process.env.NODE_ENV = 'development'

# bootstrap logger
Logger = require './lib/logger'
log = new Logger

cluster = require('cluster')
numCPUs = require('os').cpus().length

# only run cluster module in production
if cluster.isMaster and process.env.NODE_ENV is 'production'
  i = 0
  while i < numCPUs
    worker = cluster.fork() # create workers
    log.info 'Worker #' + worker.id + ' with pid ' +
      worker.process.pid + ' was created.'
    ++i

  cluster.on 'exit', (worker, code, signal) ->
    newWorker = cluster.fork() # create new worker
    msg = 'Worker #' + worker.id + ' with pid ' +
      worker.process.pid + ' died.'
    msg += 'Worker #' + newWorker.id + ' with pid ' +
      newWorker.process.pid + ' was created.'
    log.info msg

else # let workers handle jobs

  require('./config/app/express') app

  # bootstrap routes
  require('./config/app/routes') app

  # route all uncaught requests to index
  app.get '*', (req, res) ->
    res.sendfile __dirname + '/public/index.html'

  appCONFIG = require './config/env/app'
  port = process.env.PORT || appCONFIG.port || 3000
  app.listen port

  log.debug appCONFIG.name + ' listening on port ' + port + ' (' +
    process.env.NODE_ENV + ').'
