const compose = require('koa-compose');
const templateRouter = require('./templateRouter');
module.exports = compose([
	templateRouter.routes(),
	templateRouter.allowedMethods()
]);
