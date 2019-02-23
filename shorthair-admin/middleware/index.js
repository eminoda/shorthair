const compose = require("koa-compose");
const bodyParser = require("koa-bodyparser");

const router = require("../router");
module.exports = compose([bodyParser(), router]);
