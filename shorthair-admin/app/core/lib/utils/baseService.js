const BaseContextClass = require('./baseContextClass');

class BaseService extends BaseContextClass {
	constructor(ctx) {
		super(ctx);
	}

	async create(template) {
		const { app } = this;
		return await app.plugin.mongo[this.name].create(template);
	}

	async deleteById(id) {
		const { app } = this;
		return await app.plugin.mongo[this.name].deleteOne({ id: id });
	}

	async updateById(id, data) {
		const { app } = this;
		return await app.plugin.mongo[this.name].updateOne({ id: id }, data);
	}

	async getItem(id) {
		const { app } = this;
		return await app.plugin.mongo[this.name].findOne({ id: id });
	}

	async getList(data) {
		const { app } = this;
		return await app.plugin.mongo[this.name].find(data);
	}
}
module.exports = BaseService;
