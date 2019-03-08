const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
	{
		name: String
	},
	{ collection: 'user' }
);
module.exports = userSchema;
