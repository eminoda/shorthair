const debug = require('debug')('service:node');
const Service = require('../core').Service;
class NodeService extends Service {
	constructor(ctx) {
		super(ctx);
		this.name = 'node';
	}
	async getChildren(pId) {
		const { app } = this;
		let parentNode = await app.plugin.mongo[this.name].findOne({
			id: pId,
			deleted: false
		});
		if (parentNode) {
			let childNodes = await app.plugin.mongo[this.name].find({
				parentId: pId,
				deleted: false
			});
			for (let i = 0; i < childNodes.length; i++) {
				let childNode = childNodes[i];
				childNode.children = await app.plugin.mongo[this.name].find({
					parentId: childNode.id,
					deleted: false
				});
			}
			childNodes = JSON.parse(JSON.stringify(childNodes));

			parentNode = JSON.parse(JSON.stringify(parentNode));
			parentNode.children = childNodes;
		}
		return parentNode;
	}
}
module.exports = NodeService;
