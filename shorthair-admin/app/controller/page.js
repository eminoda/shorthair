const debug = require('debug')('controller:page');
const Controller = require('../core').Controller;
const { httpResult } = require('../utils');
class PageController extends Controller {
	async create() {
		const { ctx, service } = this;
		ctx.body = await service.page.createPage(ctx.request.body);
	}

	async destroy() {
		const { ctx, service } = this;
		const result = await service.page.deletePageById(ctx.params.id);
		ctx.body = httpResult(ctx.method, result);
	}

	async update() {
		const { ctx, service } = this;
		const result = await service.page.updatePageById(
			ctx.params.id,
			ctx.request.body
		);
		ctx.body = httpResult(ctx.method, result);
	}

	async show() {
		const { ctx, service } = this;
		const result = await service.page.getPageById(ctx.params.id);
		ctx.body = httpResult(ctx.method, result);
	}

	async list() {
		const { ctx, service } = this;
		const result = await service.page.getPages(ctx.request.body);
		ctx.body = httpResult(ctx.method, result);
	}
}

module.exports = PageController;
