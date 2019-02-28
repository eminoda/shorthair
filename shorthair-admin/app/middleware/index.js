const path = require('path');
const compose = require('koa-compose');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mockPath = path.join(__dirname, '../mock/template');

module.exports = compose([static(mockPath), bodyParser()]);
