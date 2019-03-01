const KoaRouter = require('koa-router');
const debug = require('debug')('router');
const methods = ['head', 'options', 'get', 'put', 'patch', 'post', 'delete'];

// egg router
class Router extends KoaRouter {
	constructor(opts, app) {
		super(opts);
		this.app = app;
		// patch koa-router
		this.patchRouterMethod();
	}

	patchRouterMethod() {
		// patch router methods to support generator function middleware and string controller
		methods.concat(['all']).forEach(method => {
			this[method] = (...args) => {
				const splited = spliteAndResolveRouterParams({ args, app: this.app });
				// format and rebuild params
				args = splited.prefix.concat(splited.middlewares);
				debug('args', args);
				return super[method](...args);
			};
		});
	}
}

function spliteAndResolveRouterParams({ args, app }) {
	let prefix;
	let middlewares;
	if (args.length >= 3 && (is.string(args[1]) || is.regExp(args[1]))) {
		// app.get(name, url, [...middleware], controller)
		prefix = args.slice(0, 2);
		middlewares = args.slice(2);
	} else {
		// app.get(url, [...middleware], controller)
		prefix = args.slice(0, 1);
		middlewares = args.slice(1);
	}
	debug('middlewares', middlewares);
	return { prefix, middlewares };
}
module.exports = Router;
