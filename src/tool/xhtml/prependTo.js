import isElement from "../type/isElement";
import toNode from "./toNode";

// 追加节点(内部开头)
export default function (el, template) {
    var node = isElement(template) ? template : toNode(template);
    el.insertBefore(node, el.childNodes[0]);
    return node;
};