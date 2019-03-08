const debug = require('debug')('controller:template');
const Controller = require('../core').Controller;
const { httpResult } = require('../utils');
class TemplateController extends Controller {
	async create() {
		const { ctx, service } = this;
		ctx.body = await service.template.createTemplate(ctx.request.body);
	}

	async destroy() {
		const { ctx, service } = this;
		const result = await service.template.deleteTemplateById(ctx.params.id);
		ctx.body = httpResult(ctx.method, result);
	}

	async update() {
		const { ctx, service } = this;
		const result = await service.template.updateTemplateById(
			ctx.params.id,
			ctx.request.body
		);
		ctx.body = httpResult(ctx.method, result);
	}

	async show() {
		const { ctx, service } = this;
		const result = await service.template.getTemplateById(ctx.params.id);
		ctx.body = httpResult(ctx.method, result);
	}

	async list() {
		const { ctx, service } = this;
		const result = await service.template.getTemplates(ctx.query);
		ctx.body = httpResult(ctx.method, result);
	}
}

module.exports = TemplateController;
