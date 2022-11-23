const _require = require;

const fs = _require('fs');
const { fullPath } = _require('../nodejs/path');
const scssLoader = require('../bin/loader/scss');
const templateLoader = require("../bin/loader/template");

window.require = function (filename, flag) {

    // 如果是需要处理的文件
    if (flag) {

        // 读取文件原生内容
        let source = fs.readFileSync(fullPath(filename, __dirname), 'utf-8');

        if (/\.html$/.test(filename)) {
            return templateLoader(source);
        } else if (/\.(css|scss)$/.test(filename)) {

            // 如果是scss文件，需要提前解析成css
            if (/\.scss$/.test(filename)) source = scssLoader(source);

            // 生效
            let styleElement = document.createElement('style');
            let head = document.head || document.getElementsByTagName('head')[0];
            styleElement.innerHTML = source;
            styleElement.setAttribute('type', 'text/css');
            head.appendChild(styleElement);
        }
    } else {
        return _require(filename);
    }
};