const globby = require('globby');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('PluginLoader');
const utils = require('../utils');
const FileLoader = require('./fileLoader');
class PluginLoader {
	constructor(options) {
		this.options = options;
	}
	load() {
		// 读取 plugin folds
		new FileLoader(this.options).load();
		const plugins = this.options.target;

		// 遍历 plugin 名称
		// 查看是否有 inject
		// 有就按照指定需求加工，没有直接返回
	}
}

module.exports = PluginLoader;
