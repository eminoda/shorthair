const Service = require('../core').Service;
class PageService extends Service {
	async createPage(page) {
		const { app } = this;
		return await app.plugin.mongo.page.create(page);
	}
	async deletePageById(id) {
		const { app } = this;
		return await app.plugin.mongo.page.deleteOne({ id: id });
	}
	async updatePageById(id, data) {
		const { app } = this;
		return await app.plugin.mongo.page.updateOne({ id: id }, data);
	}

	async getPageById(id) {
		const { app } = this;
		return await app.plugin.mongo.page.findOne({ id: id });
	}

	async getPages(data) {
		const { app } = this;
		return await app.plugin.mongo.page.find(data);
	}
}
module.exports = PageService;
