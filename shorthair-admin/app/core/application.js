const Koa = require('koa');
const debug = require('debug')('application');
const Loader = require('./lib/loader/loader');
const Router = require('./lib/router');
const ROUTER = Symbol('app#router'); // unique
// const BaseContextClass = require('./lib/baseContextClass');
class Application extends Koa {
	constructor(options = {}) {
		super();
		this.baseDir = process.cwd(); // project root dirtory
		this.loader = new Loader({
			baseDir: this.baseDir,
			app: this
		});
		debug('config', this.loader.config);
		debug('controller', this.controller);
	}
	get router() {
		if (this[ROUTER]) {
			return this[ROUTER];
		}
		const router = (this[ROUTER] = new Router({}, this));
		this.use(router.middleware());
		return router;
	}
}
module.exports = Application;
