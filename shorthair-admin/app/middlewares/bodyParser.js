const koaBodyParser = require('koa-bodyparser');

module.exports = options => {
	return koaBodyParser();
};
