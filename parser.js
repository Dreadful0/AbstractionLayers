function parseCookies(req) {
	var cookie = req.headers.cookie,
	cookies = {};
	if (cookie) cookie.split(';').forEach(function(item) {
		var parts = item.split('=');
		cookies[(parts[0]).trim()] = (parts[1] || '').trim();
	});
	return cookies;
}

function parsePOSTdata(body) {
	var data = Buffer.concat(body).toString();
	var obj = JSON.parse(data);
	if (obj.name) obj.name = obj.name.trim();
	return JSON.stringify(obj);
}

module.exports.parseCookies = parseCookies;
module.exports.parsePOSTdata = parsePOSTdata;