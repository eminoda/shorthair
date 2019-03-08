const debug = require('debug')('controller:template');
const Controller = require('../core').Controller;
class TemplateController extends Controller {
	async show() {
		const { ctx, service } = this;
		ctx.body = await service.template.getTemplateById();
	}
	async edit(ctx, next) {
		ctx.body = 222;
	}
}

module.exports = TemplateController;
