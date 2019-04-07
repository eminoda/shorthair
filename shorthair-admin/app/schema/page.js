const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const pageSchema = new mongoose.Schema({
	id: {
		type: String,
		default: function() {
			return uuidv1();
		}
	},
	name: String,
	domain: String,
	path: String,
	device: Number, // 1 h5 | 2 pc
	state: Number, // 1 草稿 | 2 发布 | 0 其他
	templateId: String,
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
	collection: 'page'
});
module.exports = pageSchema;