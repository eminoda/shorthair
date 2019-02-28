const nodesMock = require("../mock/nodes.json");
module.exports = {
  getNodesByNodeId: nodeId => {
    let nodes = [];
    for (let node of nodesMock) {
      if (node.nodeId == nodeId) {
        nodes.push(node);
      }
    }
    return nodes;
  },
  getChildNodesByNodeId: function(nodeId) {
    let childNodes = [];
    for (let node of nodesMock) {
      if (node.nodeId == nodeId) {
        if (node.childId) {
          node.childNodes = this.getChildNodesByNodeId(node.childId);
        }
        childNodes.push(node);
      }
    }
    return childNodes;
  }
};
