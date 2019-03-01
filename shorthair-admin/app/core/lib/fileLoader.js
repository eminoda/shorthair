const Loader = require('./loader');
const is = require('is-type-of');
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('fileLoader');
const utils = require('./utils');
class FileLoader {
	constructor(options = {}) {
		this.options = options;
	}
	load() {
		const items = this.parse();
		const target = this.options.target; // app.controller
		for (const item of items) {
			item.properties.reduce((target, property, index) => {
				target[property] = item.exports;
				return target;
			}, target);
		}
		debug(`target`, target);
	}
	parse() {
		const filepaths = globby.sync(['*.js'], {
			cwd: this.options.directory
		});
		const items = [];
		for (const filepath of filepaths) {
			const fullpath = path.join(this.options.directory, filepath);
			const properties = this._getProperties(filepath);
			const exports = this._getExports(fullpath, this.options, filepath);
			items.push({ fullpath, properties, exports });
		}
		return items;
	}
	_getProperties(filepath) {
		let properties = filepath
			.substring(0, filepath.lastIndexOf('.'))
			.split('/');
		return properties.map(propery => {
			return propery.toLowerCase();
		});
	}
	_getExports(fullpath, { initializer, inject }, pathName) {
		let exports = utils.loadFile(fullpath);
		if (initializer) {
			exports = initializer(exports);
		}
		return exports;
	}
}
module.exports = FileLoader;
