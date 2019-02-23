const compose = require("koa-compose");
const assets = require("koa-static");
const bodyParser = require("koa-bodyparser");
const path = require("path");
const router = require("../router");

const assetsPath = path.join(__dirname, "../mock/template");
module.exports = compose([assets(assetsPath), bodyParser(), router]);
