import isElement from "../type/isElement";

// 变成结点
export default function (template) {
    var frameTagName = 'div';

    // 大部分的标签可以直接使用div作为容器
    // 部分特殊的需要特殊的容器标签

    if (/^<tr[> ]/.test(template)) {

        frameTagName = "tbody";

    } else if (/^<th[> ]/.test(template) || /^<td[> ]/.test(template)) {

        frameTagName = "tr";

    } else if (/^<thead[> ]/.test(template) || /^<tbody[> ]/.test(template)) {

        frameTagName = "table";

    }

    var frame = document.createElement(frameTagName);
    frame.innerHTML = template;
    var childNodes = frame.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        if (isElement(childNodes[i])) return childNodes[i];
    }
    return null;
};