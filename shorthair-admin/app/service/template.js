const Service = require('../core').Service;
class TemplateService extends Service {
	constructor(ctx) {
		super(ctx);
		this.name = 'template';
	}
	// async createTemplate(template) {
	// 	const { app } = this;
	// 	return await app.plugin.mongo.template.create(template);
	// }

	// async deleteTemplateById(id) {
	// 	const { app } = this;
	// 	return await app.plugin.mongo.template.deleteOne({ id: id });
	// }

	// async updateTemplateById(id, data) {
	// 	const { app } = this;
	// 	return await app.plugin.mongo.template.updateOne({ id: id }, data);
	// }

	// async getTemplateById(id) {
	// 	const { app } = this;
	// 	console.log(this.name);
	// 	return await app.plugin.mongo.template.findOne({ id: id });
	// }

	// async getTemplates(data) {
	// 	const { app } = this;
	// 	return await app.plugin.mongo.template.find(data);
	// }
}
module.exports = TemplateService;
