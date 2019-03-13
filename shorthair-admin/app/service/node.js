const debug = require('debug')('service:node');
const Service = require('../core').Service;
class NodeService extends Service {
	constructor(ctx) {
		super(ctx);
		this.name = 'node';
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
