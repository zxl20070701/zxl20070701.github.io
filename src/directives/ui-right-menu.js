import lazyContextmenus from "../contextmenus/lazy-load";

var rootEl = document.getElementById('contextmenu-root');

document.getElementsByTagName('body')[0].addEventListener('click', function () {
    rootEl.style.display = 'none';
    rootEl.innerHTML = "";
});

export default {
    inserted: function (el, binding) {

        // 注册鼠标右键
        el.addEventListener("contextmenu", function (event) {

            // 取消默认事件
            event.preventDefault();

            // 取消冒泡事件
            event.stopPropagation();

            lazyContextmenus[binding.type]().then(function (data) {
                rootEl.innerHTML = "";
                rootEl.style.display = "";

                var contextmenuInstance = binding.useTemplate(rootEl, data.default, {
                    event: event,
                    target: el,
                    exp: binding.exp,
                    value: binding.value,
                    instance: binding.target
                });
                rootEl.setAttribute('contextmenu-view', contextmenuInstance._name || "");

                var lf = event.clientX;
                var tp = event.clientY;

                var dist = 10; // 间隙

                if (lf < 0) // 左越界
                    rootEl.style.left = dist + "px";
                else if (lf + rootEl.clientWidth + dist * 2 > window.innerWidth) // 右越界
                    rootEl.style.left = (lf - dist - rootEl.clientWidth) + "px";
                else // 水平无越界
                    rootEl.style.left = (lf + dist) + "px";

                if (tp < 0) // 上越界
                    rootEl.style.top = dist + "px";
                else if (tp + rootEl.clientHeight + dist * 2 > window.innerHeight) // 下越界
                    rootEl.style.top = (tp - dist - rootEl.clientHeight) + "px";
                else // 垂直无越界
                    rootEl.style.top = (tp + dist) + "px";
            });

        });

    }
};