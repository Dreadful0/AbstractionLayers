// Dependencies
var http = require('http'),
parser = require('./parser.js'),
rout = require('./rout.js');


// Cache
var cache = {};

// HTTP Server
http.createServer(function (req, res) {

	// Parse cookies
	var cookies = parser.parseCookies(req);

	// Logging
	log(req);

	rout.rout(cache, req, res, cookies);

}).listen(80);

function log(req) {
	var date = new Date().toISOString();
	console.log([date, req.method, req.url].join('  '));
}