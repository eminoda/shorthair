const debug = require('debug')('loader:controller');
const path = require('path');
const is = require('is-type-of');
const utils = require('./../../utils');
const { FULLPATH } = require('../../utils/symbol');

module.exports = {
	loadService(opt) {
		opt = Object.assign(
			{},
			{
				directory: path.join(this.baseDir, 'app/service')
			},
			opt
		);
		this.loadToContext(opt.directory, 'service', opt);
	}
};
