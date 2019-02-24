const styleTables = require("../styles.json");
const templateNodes = require("../templateNodes.json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const path = require("path");
const htmlFile = fs.readFileSync(path.join(__dirname, "./register.html"), {
  encoding: "utf8"
});
const dom = new JSDOM(htmlFile);
const document = dom.window.document;

appendStyle(templateNodes[0].nodes);
fs.writeFileSync(
  path.join(__dirname, "test.json"),
  JSON.stringify(templateNodes)
);

function appendStyle(nodes) {
  for (let node of nodes) {
    if (node.className) {
      // console.log(node.className);
      let selector =
        node.className.split(" ").length > 1
          ? node.className.split(" ").join(",.")
          : node.className;
      const element = document.querySelector(`.${selector}`);
      if (element) {
        const domResult = element.childNodes;
        for (let styleTable of styleTables) {
          const styleResult = document.querySelector(styleTable.selector)
            .childNodes;
          if (styleResult == domResult) {
            if (node.styleTable) {
              node.styleTable = Object.assign(
                node.styleTable,
                styleTable.style
              );
            } else {
              node.styleTable = styleTable.style;
            }
          }
        }
      }
    }
    if (node.nodes) {
      appendStyle(node.nodes);
    }
  }
}

// console.log(templateNodes[0]);
