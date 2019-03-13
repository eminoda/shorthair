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
	async list() {
		const { ctx, service } = this;
		const isTree = !!ctx.query.isTree;
		const result = isTree
			? await service[this.name].getChildNodes(ctx.query.id)
			: await service[this.name].getList(ctx.query);
		ctx.body = httpResult(ctx.method, result);
	}
}
module.exports = NodeController;
