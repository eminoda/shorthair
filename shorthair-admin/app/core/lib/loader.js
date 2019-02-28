const debug = require('debug')('loader');
const fs = require('fs');
const path = require('path');
const extend = require('extend2');
const is = require('is-type-of');

class Loader {
	constructor(options = {}) {
		this.baseDir = options.baseDir;
		this.serverEnv = this.getServerEnv();
		this.app = options.app;
		this.loadConfig();
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
	loadConfig() {
		this.config = this._preLoadAppConfig();
	}
	loadRouter() {
		// app 加载 router.js
		// 运行 app，调用 router，判断 Router
		// 创建 Router 预设所有http method 定义，加入中间件 routes()
		this.router = this.loadFile(
			this.resolveModule(path.join(this.baseDir, 'app/router'))
		);
		debug(this.router);
	}
	_preLoadAppConfig() {
		const names = ['config.default', `config.${this.serverEnv}`];
		const target = {};
		for (const filename of names) {
			const config = this._loadConfig(filename);
			extend(true, target, config);
		}
		return target;
	}
	_loadConfig(filename) {
		const filepath = this.resolveModule(
			path.join(this.baseDir, 'config', filename)
		);
		return this.loadFile(filepath);
	}
	loadFile(filepath, ...inject) {
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
	// TODO: 解析模块，而非单纯 cmd js
	resolveModule(filepath) {
		let fullPath;
		try {
			fullPath = require.resolve(filepath);
		} catch (e) {
			return undefined;
		}
		return fullPath;
	}
}

module.exports = Loader;
