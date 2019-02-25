// 将 css sheet 转换成 styleTable
const fs = require('fs');
const path = require('path');
const CSSOM = require('cssom');

function cssParse(options = {}) {
	console.log(options);
	const cssFile = fs.readFileSync(path.join(options.mockTemplateDir, options.fileName), {
		encoding: 'utf8'
	});
	const cssStyleSheet = CSSOM.parse(cssFile);
	const cssNodes = cssStyleSheet.cssRules;

	const styleTables = [];
	for (let cssNode of cssNodes) {
		const styleTable = {
			selector: '',
			style: {}
		};
		styleTable.selector = cssNode.selectorText;
		//   console.log(cssNode);
		styleTable.style = _parseStyle(cssNode.style);
		styleTables.push(styleTable);
	}
	for (let st of styleTables) {
		// .register-wrap .form-wrap .form-group .input-group,.register-wrap .form-wrap .form-group .operator
		const spaceNewlineRe = /(?:(\r\n|\n)+\s+)/g;
		if (st.selector) {
			st.selector = st.selector.replace(spaceNewlineRe, '');
			const newStyleTables = st.selector.split(',') || [];
			if (newStyleTables.length > 1) {
				_appendNextStyleTable();
				function _appendNextStyleTable() {
					newStyleTables.reduce((result, current) => {
						// .register-wrap .form-wrap .form-group .operator
						styleTables.push({
							selector: current,
							style: st.style
						});
						// console.log(current);
						return newStyleTables;
					});
				}
			}
		}
	}
	return styleTables;
}
function _parseStyle(style) {
	const styleNumber = style.length;
	const newStyle = {};
	for (let i = 0; i < styleNumber; i++) {
		const key = style[i];
		newStyle[key] = style[key];
	}
	return newStyle;
}

exports.cssParse = cssParse;
