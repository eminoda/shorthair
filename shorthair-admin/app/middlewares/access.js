module.exports = options => {
	return async (ctx, next) => {
		console.log(1);
		await next();
		console.log(2);
	};
};
