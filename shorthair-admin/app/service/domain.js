const Service = require('../core').Service;
class DomainService extends Service {
    constructor(ctx) {
        super(ctx);
        this.name = 'domain';
    }
}
module.exports = DomainService;