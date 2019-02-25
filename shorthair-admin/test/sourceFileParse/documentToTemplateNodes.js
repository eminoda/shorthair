// 将 styleTable 转换成 tempalteNodes
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

function documentParse(options = {}) {
	const htmlFile = fs.readFileSync(path.join(options.mockTemplateDir, options.fileName), {
		encoding: 'utf8'
	});
	const dom = new JSDOM(htmlFile);
	const document = dom.window.document;

	const rootNode = document.body;
	return {
		templateNodes: getElement(rootNode.childNodes),
		document: document
	};
}

function getElement(nodes) {
	if (!nodes) {
		return {};
	}
	let childElements = [];
	for (let item of nodes) {
		if (item.nodeType == 1 && item.nodeName != 'script'.toUpperCase()) {
			const element = {
				tag: item.nodeName,
				className: item.className || '',
				nodes: getElement(item.childNodes),
				text: ''
			};
			childElements.push(element);
		}
		if (item.nodeType == 3 && item.nodeValue) {
			const spaceNewlineRe = /(?:\s+|\r\n|\n)/g;
			if (item.nodeValue.replace(spaceNewlineRe, '')) {
				const element = {
					tag: item.nodeName,
					className: item.className || '',
					nodes: [],
					text: item.nodeValue
				};
				childElements.push(element);
			}
		}
	}
	return childElements;
}

function appendStyle(document, nodes, styleTables) {
	for (let node of nodes) {
		if (node.className) {
			let selector = node.className.split(' ').length > 1 ? node.className.split(' ').join(',.') : node.className;
			const element = document.querySelector(`.${selector}`);
			if (element) {
				const domResult = element.childNodes;
				for (let styleTable of styleTables) {
					// if (!document.querySelector(styleTable.selector)) {
					// 	console.log(styleTable.selector);
					// 	console.log(element);
					// }
					const styleResult = document.querySelector(styleTable.selector).childNodes;
					if (styleResult == domResult) {
						if (node.styleTable) {
							node.styleTable = Object.assign(node.styleTable, styleTable.style);
						} else {
							node.styleTable = styleTable.style;
							console.log(node);
						}
					}
				}
			}
		}
		if (node.nodes) {
			node.nodes = appendStyle(document, node.nodes, styleTables);
		}
	}
	return nodes;
}

exports.documentParse = documentParse;
exports.appendStyle = appendStyle;
