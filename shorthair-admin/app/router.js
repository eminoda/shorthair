const debug = require('debug')('router');
module.exports = app => {
	const { router, controller } = app;
	router.get('/template', controller.template.show);
	router.get('/template/:id', controller.template.edit);

	router.post('/pages', controller.page.create);
	router.delete('/pages/:id', controller.page.destroy);
	router.post('/pages/:id', controller.page.update);
	router.get('/pages/:id', controller.page.show);
	router.get('/pages', controller.page.list);
};
