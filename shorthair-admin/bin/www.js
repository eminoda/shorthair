const app = require('../app/app.js');

app.ready(() => {
	console.log('all ready');
	app.listen(3000);
});
