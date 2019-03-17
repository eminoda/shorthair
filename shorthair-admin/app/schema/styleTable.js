const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const styleTableSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			default: function() {
				return uuidv1();
			}
		},
		isReact: Boolean,
		height: String,
		width: String,
		color: String,
		'font-size': String,
		deleted: { type: Boolean, default: false },
		createDate: { type: Date, default: Date.now },
		updateDate: { type: Date, default: Date.now }
	},
	{ collection: 'styletable' }
);
module.exports = styleTableSchema;
