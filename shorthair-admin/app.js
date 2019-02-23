const Koa = require("koa");
const middleware = require("./middleware");
const app = new Koa();

app.use(middleware);

// response
app.use(ctx => {
  ctx.body = "Hello Koa";
});

module.exports = app;
