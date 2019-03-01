const debug = require('debug')('router');
module.exports = app => {
	const { router, controller } = app;
	router.get('/template', controller.template.show);
	router.get('/template/:id', controller.template.edit);
};
