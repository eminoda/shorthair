const Koa = require('koa');
const debug = require('debug')('application');
const Loader = require('./lib/loader');
const Router = require('koa-router');

class Application extends Koa {
	constructor(options = {}) {
		super();
		this.app = this;
		this.baseDir = process.cwd();
		this.loader = new Loader({
			baseDir: this.baseDir,
			app: this
		});
	}
	get router() {
		debug('123');
		return 123;
	}
}
module.exports = Application;
