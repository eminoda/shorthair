const debug = require('debug')('controller:template');
const Controller = require('../core').Controller;
const { httpResult } = require('../utils');
class TemplateController extends Controller {
	constructor(ctx) {
		super(ctx);
		this.name = 'template';
	}

	async show() {
		const { ctx, service } = this;
		let template = await service[this.name].getItem(ctx.params.id);
		let node = await service.node.getItem(template.nodeId);
		template = JSON.parse(JSON.stringify(template));
		node = JSON.parse(JSON.stringify(node));
		node.childNodes = await service.node.getChildNodes(node.id);
		template.rootNode = node;
		ctx.body = httpResult(ctx.method, template);
	}
}

module.exports = TemplateController;
