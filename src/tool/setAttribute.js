/**
 * 节点属性设置
 * @param {JSON} el 固定格式:{type:"svg"|"html",value:Element}
 * @param {string} key 属性名称
 * @param {any} value 属性指
 */
export default function (el, key, value) {
    if (el.type == 'svg' && ["href", "title", "show", "type", "role", "actuate"].indexOf(key)) {
        el.value.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:' + key, value);
    } else {
        el.value.setAttribute(key, value);
    }
};