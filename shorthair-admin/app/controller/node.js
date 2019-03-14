const debug = require('debug')('controller:node');
const Controller = require('../core').Controller;
const { httpResult } = require('../utils');
class NodeController extends Controller {
	constructor(ctx) {
		super(ctx);
		this.name = 'node';
	}
	/**
	 * @param id string
	 * @param isTree boolean 是否具有节点树
	 */
	async show() {
		const { ctx, service } = this;
		const isTree = !!ctx.query.isTree;
		const id = ctx.params.id;
		const result = isTree
			? await service[this.name].getTree(id)
			: await service[this.name].getItem(id);
		ctx.body = httpResult(ctx.method, result);
	}
}
module.exports = NodeController;
