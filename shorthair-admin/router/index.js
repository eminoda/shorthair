// const compose = require("koa-compose");
// const templateRouter = require("./templateRouter");
// module.exports = compose([
//   templateRouter.routes(),
//   templateRouter.allowedMethods()
// ]);
module.exports = app => {
	const { router } = app;
	router.get('/template', async (ctx, next) => {
		ctx.body = 123;
	});
};
