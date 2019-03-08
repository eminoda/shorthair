const Service = require('../core').Service;
class TemplateService extends Service {
	async getTemplateById(id) {
		const { app } = this;
		return await app.plugin.mongo.user.find();
	}
	async getTemplateList() {
		return {};
	}
}
module.exports = TemplateService;
