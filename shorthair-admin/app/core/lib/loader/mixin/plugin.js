const path = require('path');
const debug = require('debug')('plugin');

module.exports = {
	loadPlugin(opt) {
		opt = Object.assign(
			{
				directory: path.join(this.baseDir, 'app/plugin'),
				initializer: (obj, opt) => {
					opt.baseDir = this.baseDir;
					return obj(this.app, opt);
				}
			},
			opt
		);
		let pluginBaseDirtory = opt.directory;
		this.loadToApp(pluginBaseDirtory, 'plugin', opt);
	}
};
