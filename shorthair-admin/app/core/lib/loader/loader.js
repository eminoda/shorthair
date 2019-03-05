const debug = require('debug')('loader');
const fs = require('fs');
const path = require('path');
const is = require('is-type-of');
const FileLoader = require('./fileLoader');
const FULLPATH = Symbol('Loader#FULLPATH');
class Loader {
	constructor(options = {}) {
		this.name = 'Loader';
		this.baseDir = options.baseDir;
		this.serverEnv = this.getServerEnv();
		this.app = options.app;
		this.timing = this.app.timing;

		this.loadAll();
	}
	loadAll() {
		this.loadConfig();
		this.loadController();
		this.loadRouter();
	}
	getServerEnv() {
		let serverEnv = 'local';
		if (process.env.NODE_ENV == 'production') {
			serverEnv = 'prod';
		} else if (process.env.NODE_ENV == 'test') {
			serverEnv = 'test';
		}
		return serverEnv;
	}
	loadFile(filepath, ...inject) {
		debug('loadFile', filepath);
		if (!filepath || !fs.existsSync(filepath)) {
			return null;
		}
		if (inject.length === 0) inject = [this.app];
		let ret = require(filepath);
		if (is.function(ret) && !is.class(ret)) {
			ret = ret(...inject);
		}
		return ret;
	}
	loadRouter() {
		// app 加载 router.js
		// 运行 app，调用 router，判断 Router
		// 创建 Router 预设所有http method 定义，加入中间件 routes()
		this.router = this.loadFile(
			this.resolveModule(path.join(this.baseDir, 'app/router'))
		);
	}
	resolveModule(filepath) {
		let fullPath;
		try {
			fullPath = require.resolve(filepath);
		} catch (e) {
			return undefined;
		}
		return fullPath;
	}
	// add controller,service prop to app
	loadToApp(directory, property, opt) {
		const target = (this.app[property] = {});
		opt = Object.assign(
			{},
			{
				directory,
				target,
				inject: this.app
			},
			opt
		);
		new FileLoader(opt).load();
	}
}

const loaders = [
	require('./mixin/config.js'),
	require('./mixin/controller.js')
];
for (const loader of loaders) {
	Object.assign(Loader.prototype, loader);
}
module.exports = Loader;
