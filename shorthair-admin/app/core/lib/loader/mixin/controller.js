const debug = require('debug')('loader:controller');
const path = require('path');
const is = require('is-type-of');
const utils = require('./../../utils');
const { FULLPATH } = require('../../utils/symbol');

module.exports = {
	loadController(opt) {
		opt = Object.assign(
			{
				directory: path.join(this.baseDir, 'app/controller'),
				initializer: (obj, opt) => {
					if (is.class(obj)) {
						obj.prototype.pathName = opt.pathName;
						obj.prototype.fullPath = opt.path;
						return wrapClass(obj);
					} else {
						// TODO: 其他类型，虽然 class 为主
						throw new Error('controller must be Class type');
					}
				}
			},
			opt
		);
		let controllerBase = opt.directory;
		this.loadToApp(controllerBase, 'controller', opt);
	}
};
// class Template{}{} ==> template.method
function wrapClass(Controller) {
	let proto = Controller.prototype;
	const ret = {};
	const keys = Object.getOwnPropertyNames(proto);
	for (const key of keys) {
		if (key === 'constructor') {
			continue;
		}
		const d = Object.getOwnPropertyDescriptor(proto, key);
		if (is.function(d.value) && !ret.hasOwnProperty(key)) {
			ret[key] = methodToMiddleware(Controller, key);
			ret[key][FULLPATH] =
				Controller.prototype.fullPath +
				'#' +
				Controller.name +
				'.' +
				key +
				'()';
		}
	}
	// proto = Object.getPrototypeOf(proto);
	// debug('ret', ret);
	return ret;
}
function methodToMiddleware(Controller, key) {
	// router use
	return function classControllerMiddleware(...args) {
		const controller = new Controller(this);
		return utils.callFn(controller[key], args, controller);
	};
}
