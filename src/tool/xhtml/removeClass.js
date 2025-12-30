// 删除指定class
export default function (dom, clazz) {
    var oldClazz = " " + (dom.getAttribute('class') || "") + " ";
    var newClazz = oldClazz.replace(" " + clazz.trim() + " ", " ");
    dom.setAttribute('class', newClazz.trim());
};