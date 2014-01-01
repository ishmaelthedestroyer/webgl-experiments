var Logger, app, appCONFIG, argv, cluster, express, i, log, numCPUs, port, worker;

argv = require('optimist').argv;

express = require('express');

app = express();

if ((argv.environment != null) && argv.environment === 'production') {
  process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = 'development';
}

Logger = require('./lib/logger');

log = new Logger;

cluster = require('cluster');

numCPUs = require('os').cpus().length;

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  i = 0;
  while (i < numCPUs) {
    worker = cluster.fork();
    log.info('Worker #' + worker.id + ' with pid ' + worker.process.pid + ' was created.');
    ++i;
  }
  cluster.on('exit', function(worker, code, signal) {
    var msg, newWorker;
    newWorker = cluster.fork();
    msg = 'Worker #' + worker.id + ' with pid ' + worker.process.pid + ' died.';
    msg += 'Worker #' + newWorker.id + ' with pid ' + newWorker.process.pid + ' was created.';
    return log.info(msg);
  });
} else {
  require('./config/app/express')(app);
  require('./config/app/routes')(app);
  app.get('*', function(req, res) {
    return res.sendfile(__dirname + '/public/index.html');
  });
  appCONFIG = require('./config/env/app');
  port = process.env.PORT || appCONFIG.port || 3000;
  app.listen(port);
  log.debug(appCONFIG.name + ' listening on port ' + port + ' (' + process.env.NODE_ENV + ').');
}
