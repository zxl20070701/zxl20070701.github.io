import isElement from "../type/isElement";

// 变成结点
export default function (template) {
    var frame = document.createElement("div");
    frame.innerHTML = template;
    var childNodes = frame.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        if (isElement(childNodes[i])) return childNodes[i];
    }
    return null;
};