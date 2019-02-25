const path = require('path');
const fs = require('fs');
const cssParse = require('./cssToStyleTable.js').cssParse;
const documentParse = require('./documentToTemplateNodes.js').documentParse;
const appendStyle = require('./documentToTemplateNodes.js').appendStyle;

const styleTables = cssParse({
	mockTemplateDir: path.join(__dirname, '../../mock/template'),
	fileName: './style.css'
});
_writeToMock({
	fileName: 'styleTables.json',
	data: styleTables
});

const documentParseResult = documentParse({
	mockTemplateDir: path.join(__dirname, '../../mock/template'),
	fileName: './register.html'
});
const document = documentParseResult.document;

_writeToMock({
	fileName: 'templateNodes.json',
	data: appendStyle(document, documentParseResult.templateNodes, styleTables)
});

function _writeToMock(options = {}) {
	fs.writeFileSync(path.join(__dirname, '../../mock', options.fileName), JSON.stringify(options.data, null, 2));
}
