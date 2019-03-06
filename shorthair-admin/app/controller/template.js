const debug = require('debug')('controller:template');
const Controller = require('../core').Controller;
class TemplateController extends Controller {
	async show(ctx) {
		const { config } = this;
		ctx.body = this.ctx.service.template.getTemplateById();
	}
	async edit(ctx, next) {
		ctx.body = 222;
	}
}

module.exports = TemplateController;
