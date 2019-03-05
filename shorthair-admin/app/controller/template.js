const debug = require('debug')('controller:template');
const Controller = require('../core').Controller;
class TemplateController extends Controller {
	async show(ctx) {
		const { config } = this;
		ctx.body = config;
	}
	async edit(ctx, next) {
		ctx.body = 222;
	}
}

module.exports = TemplateController;
