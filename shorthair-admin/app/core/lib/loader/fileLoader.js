const Loader = require('./loader');
const is = require('is-type-of');
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('fileLoader');
const utils = require('../utils');
const { FULLPATH, EXPORTS } = require('../utils/symbol');
class FileLoader {
	constructor(options = {}) {
		this.options = options;
	}
	load() {
		const items = this.parse();
		const target = this.options.target; // app.controller
		for (const item of items) {
			item.properties.reduce((target, property, index) => {
				let obj;
				if (index == item.properties.length - 1) {
					obj = item.exports;
					// obj[FULLPATH] = item.fullpath;
					if (obj) {
						obj[EXPORTS] = true;
					}
				} else {
					obj = target[property] || {};
				}
				target[property] = obj;
				return obj;
			}, target);
		}
		debug('target', target);
	}
	parse() {
		// TODO '**/*.js'
		const filepaths = globby.sync(['**/*.js'], {
			cwd: this.options.directory
		});
		const items = [];
		for (const filepath of filepaths) {
			const fullpath = path.join(this.options.directory, filepath);
			if (!fs.statSync(fullpath).isFile()) {
				continue;
			}
			const properties = getProperties(filepath);
			const exports = getExports(fullpath, this.options, filepath);
			items.push({ fullpath, properties, exports });
		}
		// debug(items);
		return items;
	}
}
/**
 * 设置 properties
 * 解析目录结构文件 解析为 对象树结构
 * /controller/a.js ==> ['a']
 * /controller/user/b.js ==> ['user','b']
 *
 * @param {*} filepath	文件路径
 */
function getProperties(filepath) {
	let properties = filepath.substring(0, filepath.lastIndexOf('.')).split('/');
	return properties.map(propery => {
		return propery.toLowerCase();
	});
}
/**
 * js 文件默认导出 exports 二次 initializer 加工
 * 比如：controller 类型加载，会对 Controller 上的方法 指定执行域（call）、重新构建 ret 对象
 *
 * @param {*} fullpath
 * @param {*} initializer
 * @param {*} pathName
 */
function getExports(fullpath, { initializer, inject }, pathName) {
	let exports = utils.loadFile(fullpath);
	if (initializer) {
		exports = initializer(exports, { path: fullpath, pathName });
	}
	return exports;
}
module.exports = FileLoader;
