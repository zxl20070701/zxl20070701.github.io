export default {
    inserted: function (el, binding) {

        var types = binding.type.split('.'), modifier = {

            // 阻止默认事件
            "prevent": false,

            // 阻止冒泡
            "stop": false,

            // 只执行一次
            "once": false,

            //  回车
            "enter": false

        }, i;

        var callback = function (event) {

            if (modifier.enter) {
                var keycode = event.keyCode || event.which;
                if (keycode != 13) return;
            }

            if (modifier.stop) event.stopPropagation();
            if (modifier.prevent) event.preventDefault();

            binding.value.apply(binding.target, [event, el]);

            if (modifier.once) {
                el.removeEventListener(types[0], callback, false);
            }

        }

        for (i = 1; i < types.length; i++) {
            modifier[types[i]] = true;
        }

        el.addEventListener(types[0], callback, false);
    }
};