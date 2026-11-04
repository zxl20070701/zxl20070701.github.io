import { setValue, evalExpress } from "../tool/value/index.js";
import updateValue from "../tool/xhtml/updateValue.js";

export default {
    inserted: function (el, binding) {
        updateValue(el, binding.value);
        el.addEventListener('input', function () {
            let type = el.getAttribute('type'), elValue = el.value

            // 多选
            if (type == 'checkbox') {
                let value = el.getAttribute("value"), bindingValue = evalExpress(binding.target, binding.exp)

                // 有value属性，说明是复选框标签多选功能
                if (value) {
                    let index = bindingValue.indexOf(value)
                    if (index > -1) {
                        elValue = bindingValue.slice(0, index).concat(bindingValue.slice(index + 1))
                    } else {
                        bindingValue.push(value)
                        elValue = bindingValue
                    }
                }

                // 否则，说明是复选框标签单选功能
                else {
                    elValue = el.checked
                }
            }

            setValue(binding.target, "." + binding.exp, el.value);
        }, false);
    },
    update: function (el, binding) {
        updateValue(el, binding.value);
    }
};