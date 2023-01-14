import isElement from "../type/isElement";
import toNode from "./toNode";

// 在被指定元素之后插入结点
export default function (el, template) {
    var node = isElement(template) ? template : toNode(template);
    el.parentNode.insertBefore(node, el.nextSibling);
    return node;
};
