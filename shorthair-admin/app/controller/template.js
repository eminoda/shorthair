class TemplateController {
	async show(ctx, next) {
		this.ctx.body = 123;
	}
}

module.exports = TemplateController;
