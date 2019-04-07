const Koa = require('koa');
const debug = require('debug')('application');
const Loader = require('./lib/loader/loader');
const Router = require('./lib/router');
const ROUTER = Symbol('app#router'); // unique
const getReady = require('get-ready');
const { Ready } = require('ready-callback');
const utils = require('./lib/utils');
class Application extends Koa {
	constructor(options = {}) {
		super();
		this.loadReady = new Ready({
			lazyStart: true
		});
		this.loadReady.mixin(this);
		this.baseDir = process.cwd(); // project root dirtory
		this.loader = new Loader({
			baseDir: this.baseDir,
			app: this
		});
		this.beforeStart(() => {
			debug('all is ready');
		});
		// debug('config', this.loader.config);
		// debug('controller', this.controller);
		this.on('error', err => {
			console.log(err);
		});
	}
	get router() {
		if (this[ROUTER]) {
			return this[ROUTER];
		}
		const router = (this[ROUTER] = new Router({}, this));
		this.beforeStart(() => {
			this.use(router.middleware());
		});
		return router;
	}
	beforeStart(fn) {
		const done = this.loadReady.readyCallback('before start');
		utils
			.callFn(fn)
			.then(data => {
				done();
			})
			.catch(err => {
				done(err);
			});
	}
}
module.exports = Application;
