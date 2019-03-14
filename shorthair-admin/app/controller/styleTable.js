const debug = require('debug')('controller:styleTable');
const Controller = require('../core').Controller;
const { httpResult } = require('../utils');
class StyleTableController extends Controller {
	constructor(ctx) {
		super(ctx);
		this.name = 'styletable';
	}
}
module.exports = StyleTableController;
