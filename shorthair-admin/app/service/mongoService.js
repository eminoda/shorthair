const mongoose = require('mongoose');
mongoose.connect('mongodb://106.14.133.67:27017/shorthair', {
	useNewUrlParser: true, //mongodb://localhost:27017/dbname
	auth: {
		user: 'shorthair_rw',
		password: 'rw123456'
	},
	connectTimeoutMS: 3000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 3000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
});
