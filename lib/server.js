"use strict";

var connect = require('connect'),
    http = require('http'),
    path = require('path'),
    app = connect(),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    compression = require('compression'),
    cookieSession = require('cookie-session'),
    bodyParser = require('body-parser'),
    createStatic = require('connect-static');

function Server() {
    var self = this,
        server = http.createServer(app).listen(3000),
        io = require('socket.io')(server),
        options = {
          dir: "web",
          aliases: [
            ['/', '/index.html'],
          ],
          ignoreFile: function(fullPath) {
            var basename = path.basename(fullPath);
            return /^\./.test(basename) || /~$/.test(basename);
          },
          followSymlinks: true,
          cacheControlHeader: "max-age=0, must-revalidate",
    };
    EventEmitter.call(self);
        
    createStatic(options, function(err, middleware) {
        if (err) throw err;
        app.use('/', middleware);
    });

    app.use(compression());
    app.use(bodyParser.urlencoded());
    app.use(cookieSession({
        keys: ['secret1', 'secret2']
    }));

    io.on('connection', function (socket) {
        self.on('server.send_session', function(tcpSession) {
            socket.emit('send_session', tcpSession);
        });
    });

    self.sendSession = function(tcpSession) {
        self.emit('server.send_session', tcpSession);
    }
}

util.inherits(Server, EventEmitter);

module.exports = new Server();