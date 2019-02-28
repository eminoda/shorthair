const is = require('is-type-of');
const path = require('path');
const fs = require('fs');
module.exports = {
	loadFile(filepath) {
		try {
			// if not js module, just return content buffer
			const extname = path.extname(filepath);
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
	}
};
