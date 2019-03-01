const Controller = require('../core/lib/baseContextClass');
const debug = require('debug')('controller:template');
class TemplateController extends Controller {
	async show(ctx, next) {
		const { config } = this;
		debug('config', config);
		ctx.body = 123;
	}
	async edit(ctx, next) {
		ctx.body = 222;
	}
}

module.exports = TemplateController;
