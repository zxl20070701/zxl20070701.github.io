import hasClass from './hasClass';

// 添加指定class
export default function (dom, clazz) {
    if (hasClass(dom, clazz)) return;
    var oldClazz = dom.getAttribute('class') || "";
    dom.setAttribute('class', oldClazz + " " + clazz);
};