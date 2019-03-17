const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const pageSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			default: function() {
				return uuidv1();
			}
		},
		name: String,
		path: String,
		device: String,
		title: String, // tdk
		description: String, // tdk
		keywords: String, // tdk
		buildId: String,
		templateId: String,
		deleted: { type: Boolean, default: false },
		createDate: { type: Date, default: Date.now },
		updateDate: { type: Date, default: Date.now }
	},
	{ collection: 'page' }
);
module.exports = pageSchema;
