const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<html></html>`);
const document = dom.window.document;
const templateNodes = require("../../mock/templateNodes.json");

let totlaHtml = "";

let r = generateELementNodes(document.createElement("span"), templateNodes);
console.log(r.outerHTML);

function generateELementNodes(element, templateNodes) {
  if (templateNodes) {
    for (let node of templateNodes) {
      if (node.nodeType == 1) {
        let childElement = document.createElement(node.tag.toLocaleLowerCase());
        childElement.className = node.className;
        console.log(childElement.outerHTML);
        const next = generateELementNodes(childElement, node.nodes);
        console.log(next);
        next && childElement.appendChild(next);
        element.appendChild(childElement);
        console.log(element.outerHTML);
      }
      if (node.nodeType == 3) {
        let childElement = document.createTextNode(node.text);
        element = element.appendChild(childElement);
      }
    }
    return element;
  }
  return "";
}

// function buildHtml(nodes) {
//   let currentLevel = "";
//   for (const node of nodes) {
//     if (node.nodeType == 1) {
//       let element = document.createElement(node.tag.toLocaleLowerCase());
//       element.className = node.className;
//       let htmlStr = element.outerHTML;
//       console.log(htmlStr);
//       let startHtmlStr = htmlStr.match(
//         /^<[a-z]+(\s+[a-z]+="([a-z]+|([\-]*[a-z])\s*)*")+>/
//       )[0];
//       let middleStr = buildHtml(node.nodes);
//       const endTagRe = /<\/[a-z]+>$/;
//       const matchEndTag = htmlStr.match(endTagRe);
//       const endHtmlStr = matchEndTag ? matchEndTag[0] : "";
//       currentLevel + startHtmlStr + middleStr + endHtmlStr;
//     } else {
//       currentLevel + node.text;
//     }
//   }
//   return currentLevel;
// }

// buildHtml(templateNodes);
