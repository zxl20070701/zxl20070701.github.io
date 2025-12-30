import isString from '../tool/type/isString.js';
import updateValue from "../tool/xhtml/updateValue.js";

var doit = function (el, binding) {

    // 如果有type表示给属性赋值
    if (isString(binding.type) && binding.type.length > 0) {
        if (el.getAttribute(binding.type) != binding.value) {
            el.setAttribute(binding.type, binding.value);
        }
    }

    // 否则是设置内容或值
    else {
        updateValue(el, binding.value);
    }

}

export default {
    inserted: doit,
    update: doit
};