const Controller = require('../core/lib/baseContextClass');
const debug = require('debug')('controller:template');
class TemplateController extends Controller {
	async show(ctx) {
		console.log(this);
		const { config } = this;
		ctx.body = 123;
	}
	async edit(ctx, next) {
		ctx.body = 222;
	}
}

module.exports = TemplateController;
