import { setValue } from "../tool/value/index";

export default {
    inserted: function (el, binding) {
        el.value = binding.value;
        el.addEventListener('input', function () {
            setValue(binding.target, "." + binding.exp, el.value);
        }, false);
    },
    update: function (el, binding) {
        el.value = binding.value;
    }
};