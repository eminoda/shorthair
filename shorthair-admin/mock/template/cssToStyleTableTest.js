// 将 css sheet 转换成 styleTable
const fs = require("fs");
const path = require("path");
const CSSOM = require("cssom");

const cssFile = fs.readFileSync(path.join(__dirname, "./style.css"), {
  encoding: "utf8"
});
const cssStyleSheet = CSSOM.parse(cssFile);
const cssNodes = cssStyleSheet.cssRules;

const styleTables = [];
for (let cssNode of cssNodes) {
  const styleTable = {
    selector: "",
    style: {}
  };
  styleTable.selector = cssNode.selectorText;
  //   console.log(cssNode);
  styleTable.style = _parseStyle(cssNode.style);
  styleTables.push(styleTable);
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
console.log(styleTables);
