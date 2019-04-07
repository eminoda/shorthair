const BaseContextClass = require('./baseContextClass');
const { httpResult } = require('../../../utils');
class BaseService extends BaseContextClass {
	constructor(ctx) {
		super(ctx);
	}
	async create() {
		const { ctx, service } = this;
		const result = await service[this.name].create(ctx.request.body);
		ctx.body = httpResult(ctx.method, result);
	}

	async destroy() {
		const { ctx, service } = this;
		const result = await service[this.name].deleteById(ctx.params.id);
		ctx.body = httpResult(ctx.method, result);
	}

	async update() {
		const { ctx, service } = this;
		const result = await service[this.name].updateById(ctx.params.id, ctx.request.body);
		ctx.body = httpResult(ctx.method, result);
	}

	async show() {
		const { ctx, service } = this;
		const result = await service[this.name].getItem(ctx.params.id);
		ctx.body = httpResult(ctx.method, result);
	}

	async list() {
		const { ctx, service } = this;
		const pageSize = Number(ctx.query.pageSize || 10);
		const page = Number(ctx.query.page || 1);
		const list = await service[this.name].getList(ctx.query);
		const total = await service[this.name].getCount(ctx.query);
		ctx.body = httpResult(ctx.method, {
			list,
			total,
			pageSize,
			page
		});
	}
}
module.exports = BaseService;
