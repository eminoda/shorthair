const debug = require('debug')('utils');
const is = require('is-type-of');
const path = require('path');
const fs = require('fs');

module.exports = {
	loadFile(filepath) {
		try {
			// if not js module, just return content buffer
			const extname = path.extname(filepath);
			// debug('extname', extname);
			if (extname && !require.extensions[extname]) {
				return fs.readFileSync(filepath);
			}
			// require js module
			const obj = require(filepath);
			if (!obj) return obj;
			// it's es module
			if (obj.__esModule) return 'default' in obj ? obj.default : obj;
			return obj;
		} catch (err) {
			err.message = `[egg-core] load file: ${filepath}, error: ${err.message}`;
			throw err;
		}
	},
	async callFn(fn, args, ctx) {
		args = args || [];
		if (!is.function(fn)) return;
		// if (is.generatorFunction(fn)) fn = co.wrap(fn);
		return ctx ? fn.call(ctx, ...args) : fn(...args);
	},
	middleware(fn) {
		return is.generatorFunction(fn) ? convert(fn) : fn;
	}
};
