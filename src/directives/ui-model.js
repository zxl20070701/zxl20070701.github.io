import { setValue } from "../tool/value/index.js";
import updateValue from "../tool/xhtml/updateValue.js";

export default {
    inserted: function (el, binding) {
        updateValue(el, binding.value);
        el.addEventListener('input', function () {
            setValue(binding.target, "." + binding.exp, el.value);
        }, false);
    },
    update: function (el, binding) {
        updateValue(el, binding.value);
    }
};