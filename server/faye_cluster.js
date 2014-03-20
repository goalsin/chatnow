var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var workers = {}; 
var port    = 9200;

// Don't use all cores in case of runaway processes
numCPUs = numCPUs / 2;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died.');
  });
} else {
  var http = require('http');
  var faye = require('faye');
  var faye_redis = require('faye-redis');
  var server = http.createServer();
  var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 25,
    engine: {
      type: faye_redis,
      host: 'localhost',
      port: 6379
    }
  });

  bayeux.attach(server);
  server.listen(port);
}

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})
