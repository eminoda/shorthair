const path = require('path');
const extend = require('extend2');

module.exports = {
	loadConfig() {
		this.config = this.app.config = this._preLoadAppConfig();
	},
	_preLoadAppConfig() {
		const names = ['config.default', `config.${this.serverEnv}`];
		const target = {};
		for (const filename of names) {
			const config = this._loadConfig(filename);
			extend(true, target, config);
		}
		return target;
	},
	_loadConfig(filename) {
		const filepath = this.resolveModule(
			path.join(this.baseDir, 'config', filename)
		);
		return this.loadFile(filepath);
	}
};
