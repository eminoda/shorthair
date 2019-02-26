const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`<html></html>`);
const document = dom.window.document;
const templateNodes = require('../../mock/templateNodes.json');

let totlaHtml = '';

let rootElement = document.createElement('body');
generateELementNodes(rootElement, templateNodes);

fs.writeFileSync(path.join(__dirname, 'result.html'), rootElement.outerHTML);

function generateELementNodes(element, templateNodes) {
	if (templateNodes) {
		for (let node of templateNodes) {
			if (node.nodeType == 1) {
				let childElement = document.createElement(node.tag.toLocaleLowerCase());
				for (let attr in node.attribute) {
					childElement.setAttribute(attr, node.attribute[attr]);
				}
				// childElement.className = node.className;
				generateELementNodes(childElement, node.nodes);
				element.appendChild(childElement);
			}
			if (node.nodeType == 3) {
				let childElement = document.createTextNode(node.text);
				element.appendChild(childElement);
			}
		}
	}
}
