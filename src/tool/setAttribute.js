
// 记录需要使用xlink命名空间常见的xml属性
const XLINK_ATTRIBUTE = ["href", "title", "show", "type", "role", "actuate"];

export default function (el, key, value) {
    if (el.type == 'svg' && XLINK_ATTRIBUTE.indexOf(key)) {
        el.value.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:' + key, value);
    } else {
        el.value.setAttribute(key, value);
    }
};