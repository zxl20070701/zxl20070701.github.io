import isElement from "../type/isElement";
import toNode from "./toNode";

// 在被选元素之前插入内容
export default function (el, template) {
    var node = isElement(template) ? template : toNode(template);
    el.parentNode.insertBefore(node, el);
    return node;
};