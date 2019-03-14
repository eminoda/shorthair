const debug = require('debug')('service:styleTable');
const Service = require('../core').Service;
const { mongoParse } = require('../utils');
class NodeService extends Service {
	constructor(ctx) {
		super(ctx);
		this.name = 'styletable';
	}
}
module.exports = NodeService;
