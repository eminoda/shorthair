const Service = require('../core').Service;
class NodeService extends Service {
	constructor(ctx) {
		super(ctx);
		this.name = 'node';
	}
}
module.exports = NodeService;
