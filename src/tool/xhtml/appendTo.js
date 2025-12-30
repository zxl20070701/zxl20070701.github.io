import isElement from "../type/isElement";
import toNode from "./toNode";

// 追加节点(内部结尾)
export default function (el, template) {
    var node = isElement(template) ? template : toNode(template);
    el.appendChild(node);
    return node;
};