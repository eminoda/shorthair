// const templateByIdMock = require("../mock/registerTemplate.json");
const templateDao = require("../dao/templateDao");
const nodeDao = require("../dao/nodeDao");
module.exports = {
  getTemplateById: id => {
    let template = templateDao.getTemplateById(id);
    let nodeId = template.nodeId;
    template.childNodes = nodeDao.getChildNodesByNodeId(nodeId);
    return template;
  }
};
