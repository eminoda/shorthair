const debug = require('debug')('controller:domain');
const Controller = require('../core').Controller;
class DomainController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.name = 'domain';
    }
}

module.exports = DomainController;