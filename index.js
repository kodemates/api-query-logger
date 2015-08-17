var tcpEventEmitter = require('./lib/tcpEventEmitter'),
    appServer = require('./lib/server');


tcpEventEmitter.on('tcp.recv', function(tcpSession) {
    console.log(tcpSession);
});



tcpEventEmitter.on('tcp.recv', function(tcpSession) {
    console.log(tcpSession);
});