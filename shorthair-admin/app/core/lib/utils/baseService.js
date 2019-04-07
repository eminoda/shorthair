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

	async getList(query) {
		let pageSize = query.pageSize ? query.pageSize : 10;
		let page = query.page ? query.page : 1;
		const { app } = this;
		query.pageSize && delete query.pageSize;
		query.page && delete query.page;
		return await app.plugin.mongo[this.name]
			.find(query)
			.skip(Number(pageSize * (page - 1)))
			.limit(Number(pageSize));
	}

	async getCount(query) {
		const { app } = this;
		query.pageSize && delete query.pageSize;
		query.page && delete query.page;
		return await app.plugin.mongo[this.name].find(query).count();
	}
}
module.exports = BaseService;
