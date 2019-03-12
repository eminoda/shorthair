const debug = require('debug')('controller:node');
const Controller = require('../core').Controller;
const { httpResult } = require('../utils');
class NodeController extends Controller {
	constructor(ctx) {
		super(ctx);
		this.name = 'node';
	}
	async show() {
		const { ctx, service } = this;
		// const result = await service[this.name].getItem(ctx.params.id);
		let self = this;
		const result = await getTree(ctx.params.id, function(id) {
			service[self.name].getList(id);
		});
		ctx.body = httpResult(ctx.method, result);
	}
}
async function getTree(id, cb) {
	let node = await cb(id);
	if (node && node.childId) {
		node.children = await getTree(node.childId, cb);
	}
	return node;
}
module.exports = NodeController;
