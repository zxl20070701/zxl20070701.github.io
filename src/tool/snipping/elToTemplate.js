import getStyle from '../xhtml/getStyle';

var imgUrlWill = {};
var elToTemplate = function (el) {
    var tagName = el.tagName.toLowerCase();

    var styleTemplate = "";
    var elStyles = getStyle(el);

    for (var index = 0; index < elStyles.length; index++) {
        var keyName = elStyles[index];
        var keyValue = elStyles[keyName];

        // 背景图片
        if (/^background\-image/.test(keyName)) {
            if (/^url\(\".+\"\)$/.test(keyValue)) {
                var imgUrl = keyValue.replace(/^url\(\"/, "").replace(/\"\)$/, "");
                keyValue = encodeURIComponent("@@@@" + imgUrl + "@@@@");
                imgUrlWill[keyValue] = imgUrl;
            }
        }

        styleTemplate += keyName + ":" + keyValue + ";";
    }

    var template = "<" + tagName + " style='" + styleTemplate + "'>";

    for (var index = 0; index < el.childNodes.length; index++) {

        // 排除掉一些特殊的标签和截图工具本身
        if (["SCRIPT", "#comment"].indexOf(el.childNodes[index].nodeName) > -1 || (el.childNodes[index].getAttribute && el.childNodes[index].getAttribute('page-view') == 'snipping-tool')) {
            continue;
        }

        if (el.childNodes[index].nodeType == '3') {
            template += el.childNodes[index].textContent;
        } else if (el.childNodes[index].nodeType == '1') {
            template += elToTemplate(el.childNodes[index]);
        }

    }

    template += "</" + tagName + ">";
    return template;
};

export default function (el) {
    imgUrlWill = {};
    var template = elToTemplate(el);

    return new Promise(function (resolve, reject) {
        var promises = [];

        for (var key in imgUrlWill) {
            (function (key) {
                promises.push(new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.onload = function () {

                        var canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;

                        var context = canvas.getContext('2d');
                        context.drawImage(img, 0, 0);

                        var base64 = canvas.toDataURL();
                        while (template.match(key)) {
                            template = template.replace(key, "url(" + base64 + ")");
                        }

                        resolve();
                    };
                    img.src = imgUrlWill[key];
                }));
            })(key);
        }

        Promise.all(promises).then(function () {
            resolve(template);
        });
    });
};