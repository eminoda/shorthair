const debug = require('debug')('controller:template');
const Controller = require('../core').Controller;
const { httpResult } = require('../utils');
class TemplateController extends Controller {
	constructor(ctx) {
		super(ctx);
		this.name = 'template';
	}
}

module.exports = TemplateController;
