module.exports = options => {
	return async (ctx, next) => {
		console.log('start');
		await next();
		console.log('end');
	};
};
