const path = require('path');
module.exports = {
	loadMiddleware(opt) {
		const app = this.app;
		// load middleware to app.middleware
		opt = Object.assign(
			{
				directory: path.join(this.baseDir, 'app/middlewares')
			},
			opt
		);
		const middlewarePaths = opt.directory;
		this.loadToApp(middlewarePaths, 'middlewares', opt);

		for (const name in app.middlewares) {
			Object.defineProperty(app.middleware, name, {
				get() {
					return app.middlewares[name];
				},
				enumerable: false,
				configurable: false
			});
		}
		for (const orderName of app.config.middleware) {
			let mw = app.middlewares[orderName];
			mw = wrapMiddleware(mw, {});
			if (mw) {
				app.use(mw);
			}
		}
	}
};
function wrapMiddleware(mw, options) {
	const fn = (ctx, next) => {
		return mw(options)(ctx, next);
	};
	return fn;
}
