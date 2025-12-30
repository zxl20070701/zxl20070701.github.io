import isElement from '../type/isElement';

// 在当前上下文context上查找结点
// selectFun可选，返回boolean用以判断当前面对的结点是否保留
export default function (context, selectFun, tagName) {
    if (!isElement(context)) return [];
    var nodes = context.getElementsByTagName(tagName || '*');
    var result = [];
    for (var i = 0; i < nodes.length; i++) {
        if (isElement(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i])))
            result.push(nodes[i]);
    }
    return result;
}