const debug = require('debug')('controller:node');
const Controller = require('../core').Controller;
const { httpResult } = require('../utils');
class NodeController extends Controller {
	constructor(ctx) {
		super(ctx);
		this.name = 'node';
	}
	/**
	 * isTree boolean 是否具有节点树
	 */
	async show() {
		const { ctx, service } = this;
		const isTree = ctx.query.isTree || false;
		const result = isTree
			? await service[this.name].getTree(ctx.params.id)
			: await service[this.name].getItem(ctx.params.id);
		ctx.body = httpResult(ctx.method, result);
	}
}
module.exports = NodeController;
