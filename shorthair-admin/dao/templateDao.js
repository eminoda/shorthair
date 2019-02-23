const templates = require("../mock/templates.json");
module.exports = {
  getTemplateById: id => {
    for (let template of templates) {
      if (template.id == id) {
        return template;
      }
    }
    return {};
  }
};
