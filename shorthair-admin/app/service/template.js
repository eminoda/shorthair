// const templateByIdMock = require("../mock/registerTemplate.json");
// const templateDao = require("../dao/templateDao");
// const nodeDao = require("../dao/nodeDao");
// module.exports = {
//   getTemplateById: id => {
//     let template = templateDao.getTemplateById(id);
//     let nodeId = template.nodeId;
//     template.childNodes = nodeDao.getChildNodesByNodeId(nodeId);
//     return template;
//   }
// };
const Service = require('../core').Service;
class TemplateService extends Service {
	getTemplateById(id) {
		// let template = templateDao.getTemplateById(id);
		// let nodeId = template.nodeId;
		// template.childNodes = nodeDao.getChildNodesByNodeId(nodeId);
		// return template;
		return {
			name: 123
		};
	}
}
module.exports = TemplateService;
