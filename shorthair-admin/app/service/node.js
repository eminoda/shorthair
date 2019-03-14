const debug = require('debug')('service:node');
const Service = require('../core').Service;
const { mongoParse } = require('../utils');
class NodeService extends Service {
	constructor(ctx) {
		super(ctx);
		this.name = 'node';
	}

	async getItem(id) {
		const { app } = this;
		return await app.plugin.mongo[this.name]
			.findOne({ id: id })
			.populate('styleTableId');
	}

	async getTree(id) {
		let rootNode = await this.getItem(id);
		rootNode = mongoParse(rootNode);
		rootNode.childNodes = await this.getChildNodes(rootNode.id);
		return rootNode;
	}

	async getChildNodes(parentId) {
		const { app } = this;
		let childNodes = await app.plugin.mongo[this.name].find({
			parentId: parentId
		});
		childNodes = JSON.parse(JSON.stringify(childNodes));
		if (childNodes) {
			for (let i = 0; i < childNodes.length; i++) {
				let childNode = childNodes[i];
				childNode.childNodes = await this.getChildNodes(childNode.id);
			}
		}
		return childNodes;
	}
}
module.exports = NodeService;
