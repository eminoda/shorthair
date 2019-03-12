const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const nodeSchema = new mongoose.Schema(
	{
		id: { type: String, default: uuidv1() },
		childId: String,
		name: String,
		nodeType: Number, // 1 普通类型；3 文本类型
		tag: String,
		className: String,
		attribute: Array,
		text: String,
		styleTableId: String,
		deleted: { type: Boolean, default: false },
		createDate: { type: Date, default: Date.now },
		updateDate: { type: Date, default: Date.now }
	},
	{ collection: 'node' }
);
module.exports = nodeSchema;
