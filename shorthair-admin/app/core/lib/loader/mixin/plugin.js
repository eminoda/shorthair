const path = require('path');
const debug = require('debug')('plugin');

module.exports = {
	loadPlugin(opt) {
		opt = Object.assign(
			{},
			{
				directory: path.join(this.baseDir, 'app/plugin')
			},
			opt
		);
		this.loadToPlugin(opt.directory, 'plugin', opt);
	}
};
