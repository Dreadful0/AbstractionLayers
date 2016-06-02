var parser = require('./parser.js'),
fileSystem = require('./fileSystem.js');

function rout(cache, req, res, cookies) {
	// Serve from cache
	if (cache[req.url] && req.method === 'GET') {
		res.writeHead(200);
		res.end(cache[req.url]);
	} else {
		// Routing
		var methodAndUrl = req.method + req.url;
		try{
			routing[methodAndUrl](cache, req, res, cookies);
		}catch(err){
			routing['default'](res);
		}
	}
}

var routing = {
	'GET/' : function(cache, req, res, cookies) {
		res.writeHead(200, {
			'Set-Cookie': 'mycookie=test',
			'Content-Type': 'text/html'
		});
		var ip = req.connection.remoteAddress;
		res.write('<h1>Welcome</h1>Your IP: ' + ip);
		res.end('<pre>' + JSON.stringify(cookies) + '</pre>');
	},
	'GET/person' : function(cache, req, res) {
		fileSystem.readPerson(function (err, obj) {
			// HTTP reply
			if(!err){
				var data = JSON.stringify(obj);
				cache[req.url] = data;
				res.writeHead(200);
				res.end(data);
			}
			else{
				res.writeHead(500);
				res.end('Read error');
			}
		});
	},
	'POST/person' : function(cache, req, res) {
		// Receiving POST data
		var body = [];
		req.on('data', function(chunk) {
			body.push(chunk);
		}).on('end', function() {

			data = parser.parsePOSTdata(body);
			cache[req.url] = data;
			var err = fileSystem.writePerson(data);
			if (!err) {
				res.writeHead(200);
				res.end('File saved');
			} else {
				res.writeHead(500);
				res.end('Write error');
			}
		});
	},
	'default' : function(res) {
		res.writeHead(404);
		res.end('Path not found');		
	}
}

module.exports.rout = rout;