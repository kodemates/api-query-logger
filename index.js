var pcap = require('pcap'),
	util = require('util'),
  appServer = require('./lib/server'),
  tcp_tracker = new pcap.TCPTracker(),
  device = 'lo',
  pcap_session = pcap.createSession(device, 'ip proto \\tcp'),
  parser = require('http-string-parser'),

    app = require('http').createServer(handler),
	io = require('socket.io')(app),
	fs = require('fs'),

	EventEmitter = require('events').EventEmitter,
	tcpEventEmitter;




function TCPEventEmitter () {

}

util.inherits(TCPEventEmitter, EventEmitter);
tcpEventEmitter = new TCPEventEmitter()


//console.log("Listening on device: " + pcap_session.device_name);
tcp_tracker.on('session', function (session) {
	session.on("data send", function (tcp_session, chunk) {
		tcpEventEmitter.emit('onData', {data: chunk.toString('utf8')});
		var info = parser.parseRequest(chunk.toString('utf8'));
		//console.log(info);
		//console.log(util.format('%s: %s%s', info.method, info.headers.Host, info.uri));
		//console.log(chunk.toString('utf8'));
    });

	session.on("data recv", function (tcp_session, chunk) {
		tcpEventEmitter.emit('onData', {data: chunk.toString('utf8')});
		var info = parser.parseResponse(chunk.toString('utf8'));
		console.log(info);
		//console.log(util.format('%s %s', info.statusCode, info.headers['Content-Type']));
	});
});

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
});
