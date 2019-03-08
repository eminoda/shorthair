const Application = require('./core/application');
const app = new Application();

const middleware = require('./middleware');

app.use(middleware);

module.exports = app;
