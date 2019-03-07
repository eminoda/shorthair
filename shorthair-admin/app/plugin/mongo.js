const mongoose = require('mongoose');
module.exports = app => {
	const config = app.config.mongo;
	createConnect(config);
	const mongo = {
		model: {}
	};
	return mongo;
};

function createConnect(config) {
	mongoose.connect(config.url, {
		useNewUrlParser: true, //mongodb://localhost:27017/dbname
		auth: {
			user: config.user,
			password: config.pass
		},
		connectTimeoutMS: 3000, // Give up initial connection after 10 seconds
		socketTimeoutMS: 3000, // Close sockets after 45 seconds of inactivity
		family: 4 // Use IPv4, skip trying IPv6
	});
}
