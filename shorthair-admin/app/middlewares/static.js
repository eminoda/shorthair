const koaStatic = require('koa-static');
const path = require('path');
const mockPath = path.join(__dirname, '../../mock/template');

module.exports = options => {
	return koaStatic(mockPath);
};
