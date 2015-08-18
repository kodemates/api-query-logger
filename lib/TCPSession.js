'strict mode';

function TCPSession(data) {
	var self = this;

	self.request = null;
	self.response = null;

	self.setRequest = function(chunk) {}

	self.setResponse = function(chunk) {}
}

module.exports = TCPSession;