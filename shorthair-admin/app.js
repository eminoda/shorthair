const Application = require('./core/application');
const app = new Application();

const middleware = require('./middleware');
// const router = require('./router');

// console.log(app.router);
app.use(middleware);
// app.use(router);

module.exports = app;
