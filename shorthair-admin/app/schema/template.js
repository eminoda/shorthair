const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const templateSchema = new mongoose.Schema({
	id: {
		type: String,
		default: function() {
			return uuidv1();
		}
	},
	name: String,
	node: String,
	type: Number, // 1 页面 | 2 子模板
	nodeId: String,
	deleted: {
		type: Boolean,
		default: false
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	updateDate: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'template'
});
module.exports = templateSchema;