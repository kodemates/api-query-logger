'strict mode';

var pcap = require('pcap'),
	util = require('util'),
    HTTPSession = require('./HTTPSession'),
    tcp_tracker = new pcap.TCPTracker(),
    device = 'lo',
    pcap_session = pcap.createSession(device, 'ip proto \\tcp'),
    EventEmitter = require('events').EventEmitter,
    tcpEventEmitter;


function TCPEventEmitter () {
  var self = this;
  EventEmitter.call(self);
  
  console.log("Listening on device: " + pcap_session.device_name);
  tcp_tracker.on('session', function (session) {
    var httpSession = new HTTPSession(session);

    session.on("data send", function (tcp_session, chunk) {
      httpSession.setRequest(chunk);
      self.emit('tcp.send', httpSession);
    });

    session.on("data recv", function (tcp_session, chunk) {
      httpSession.setResponse(chunk);
      self.emit('tcp.recv', httpSession);
    });
  });
}

util.inherits(TCPEventEmitter, EventEmitter);

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
});

module.exports = new TCPEventEmitter();