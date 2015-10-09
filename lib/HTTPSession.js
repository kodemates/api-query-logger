'strict mode';

var parser = require('http-string-parser'),
    util = require('util'),
    TCPSession = require('./TCPSession');

function HTTPSession(data) {
    var self = this;
    TCPSession.call(self);

    self.request = null;
    self.response = null;

    self.setRequest = function (chunk) {
        self.request = parser.parseResponse(chunk.toString('utf8'));
    };

    self.setResponse = function (chunk) {
        self.response = parser.parseResponse(chunk.toString('utf8'));
    };
}

util.inherits(HTTPSession, TCPSession);

module.exports = HTTPSession;