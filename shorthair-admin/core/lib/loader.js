const debug = require('debug')('loader');
const fs = require('fs');
const path = require('path');
const extend = require('extend2');

class Loader {
	constructor(options = {}) {
		this.baseDir = options.baseDir;
		this.app = options.app;
		this.serverEnv = this.getServerEnv();
		this.loadConfig();
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
		this.app.config = this._preLoadAppConfig();
		debug('app.config', this.app.config);
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
	_preLoadAppConfig() {
		const names = ['config.default', `config.${this.serverEnv}`];
		const target = {};
		for (const filename of names) {
			let filepath = this.resolveModule(
				path.join(this.baseDir, 'config', filename)
			);
			const config = this._getConfig(filepath);
			extend(true, target, config);
		}
		return target;
	}
	_getConfig(filepath) {
		if (filepath) {
			return require(filepath);
		}
		return null;
	}
}

module.exports = Loader;
