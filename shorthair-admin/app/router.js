const debug = require('debug')('router');
module.exports = app => {
	const { router, controller } = app;
	console.log(controller);
	router.post('/pages', controller.page.create);
	router.delete('/pages/:id', controller.page.destroy);
	router.post('/pages/:id', controller.page.update);
	router.get('/pages/:id', controller.page.show);
	router.get('/pages', controller.page.list);

	router.post('/templates', controller.template.create);
	router.delete('/templates/:id', controller.template.destroy);
	router.post('/templates/:id', controller.template.update);
	router.get('/templates/:id', controller.template.show);
	router.get('/templates', controller.template.list);
};
