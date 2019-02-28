const debug = require('debug')('router');
module.exports = app => {
	const { router } = app;
	router.get('/template', async (ctx, next) => {
		ctx.body = 123;
	});
	return true;
};
