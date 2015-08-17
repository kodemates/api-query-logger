"use strict";

var tcpEventEmitter = require('./lib/tcpEventEmitter'),
    appServer = require('./lib/server');


tcpEventEmitter.on('tcp.recv', function(tcpSession) {
    appServer.sendSession(tcpSession);
});