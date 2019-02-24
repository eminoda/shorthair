// 将 styleTable 转换成 tempalteNodes
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const path = require("path");

const htmlFile = fs.readFileSync(path.join(__dirname, "./register.html"), {
  encoding: "utf8"
});

const dom = new JSDOM(htmlFile);
const document = dom.window.document;

const rootNode = document.body;

function getElement(nodes) {
  if (!nodes) {
    return {};
  }
  let childElements = [];
  for (let item of nodes) {
    if (item.nodeType == 1 && item.nodeName != "script".toUpperCase()) {
      const element = {
        tag: item.nodeName,
        className: item.className || "",
        nodes: getElement(item.childNodes),
        text: ""
      };
      childElements.push(element);
    }
    if (item.nodeType == 3 && item.nodeValue) {
      const spaceNewlineRe = /(?:\s+|\r\n|\n)/g;
      if (item.nodeValue.replace(spaceNewlineRe, "")) {
        const element = {
          tag: item.nodeName,
          className: item.className || "",
          nodes: [],
          text: item.nodeValue
        };
        childElements.push(element);
      }
    }
  }
  return childElements;
}
const template = getElement(rootNode.childNodes);
console.log(JSON.stringify(template));
