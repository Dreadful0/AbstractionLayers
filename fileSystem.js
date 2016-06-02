var fs = require('fs');

function readPerson(callback) {
	fs.readFile('./person.json', function(err, data) {
		if (!err) {
			// Some business logic
			var obj = JSON.parse(data);
			obj.birth = new Date(obj.birth);
			var difference = new Date() - obj.birth;
			obj.age = Math.floor(difference / 31536000000);
			delete obj.birth;
			callback(null, obj);
		}
		else callback(err);
	});
}

function writePerson(data) {
	fs.writeFile('./person.json', data, function(err) {
		return err;
	});
}

module.exports.readPerson = readPerson;
module.exports.writePerson = writePerson;