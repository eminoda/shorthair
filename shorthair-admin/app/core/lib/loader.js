const debug = require('debug')('loader');
const fs = require('fs');
const path = require('path');
const extend = require('extend2');
const is = require('is-type-of');
const globby = require('globby');
const FileLoader = require('./fileLoader');
class Loader {
	constructor(options = {}) {
		this.baseDir = options.baseDir;
		this.serverEnv = this.getServerEnv();
		this.app = options.app;
		this.timing = this.app.timing;
		this.config = this.loadConfig();
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
	loadConfig() {
		return this._preLoadAppConfig();
	}
	loadRouter() {
		// app 加载 router.js
		// 运行 app，调用 router，判断 Router
		// 创建 Router 预设所有http method 定义，加入中间件 routes()
		this.router = this.loadFile(
			this.resolveModule(path.join(this.baseDir, 'app/router'))
		);
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
	loadController(opt) {
		const timingKey = 'Load Controll';
		this.timing.start(timingKey);
		opt = Object.assign(
			{
				directory: path.join(this.baseDir, 'app/controller'),
				initializer: (obj, opt) => {
					if (is.class(obj)) {
						return this.wrapObject(obj);
					} else {
						// TODO: 其他类型，虽然 class 为主
						throw new Error('controller mustbe class type');
					}
				}
			},
			opt
		);
		let controllerBase = opt.directory;
		this.loadToApp(controllerBase, 'controller', opt);
		this.timing.end(timingKey);
	}
	// class Template{}{} ==> template.method
	wrapObject(Controller) {
		let proto = Controller.prototype;
		const ret = {};
		const keys = Object.getOwnPropertyNames(proto);
		for (const key of keys) {
			if (key === 'constructor') {
				continue;
			}
			const d = Object.getOwnPropertyDescriptor(proto, key);
			if (is.function(d.value)) {
				ret[key] = async (ctx, next) => {
					const controller = new Controller(this);
					return await controller[key].call(this, ctx, next);
				};
			}
		}
		// proto = Object.getPrototypeOf(proto);
		return ret;
	}
	// app.controller = {}
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

module.exports = Loader;
