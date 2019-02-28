const Koa = require('koa');
const debug = require('debug')('application');
const Loader = require('./lib/loader');
const Router = require('./lib/router');
const Timing = require('./lib/utils/timing');
const ROUTER = Symbol('app#router'); // unique
class Application extends Koa {
	constructor(options = {}) {
		super();
		this.app = this;
		this.baseDir = process.cwd();
		this.timing = new Timing();
		this.loader = new Loader({
			baseDir: this.baseDir,
			app: this
		});
		debug('config', this.loader.config);
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
