/* ============================================================
   三态主题切换（浅色 / 深色 / 跟随系统）
   首屏防闪烁由各页 <head> 内联脚本负责，这里只负责交互
   ============================================================ */
(function () {
    var KEY = "zzz-theme";
    var MODES = ["light", "dark", "auto"];

    function current() {
        var m = document.documentElement.getAttribute("data-theme");
        return MODES.indexOf(m) >= 0 ? m : "auto";
    }

    function paint() {
        var m = current();
        var btns = document.querySelectorAll("[data-theme-set]"), i;
        for (i = 0; i < btns.length; i++) {
            btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-theme-set") === m ? "true" : "false");
        }
    }

    function apply(mode) {
        if (MODES.indexOf(mode) < 0) mode = "auto";
        document.documentElement.setAttribute("data-theme", mode);
        try {
            localStorage.setItem(KEY, mode);
        } catch (e) { }
        paint();
    }

    document.addEventListener("click", function (e) {
        var el = e.target;
        while (el && el !== document) {
            if (el.getAttribute && el.getAttribute("data-theme-set")) {
                e.preventDefault();
                apply(el.getAttribute("data-theme-set"));
                return;
            }
            el = el.parentNode;
        }
    });

    // 跟随系统模式下，系统切换时同步刷新按钮态
    if (window.matchMedia) {
        var mq = window.matchMedia("(prefers-color-scheme: dark)");
        var onChange = function () {
            paint();
        };
        if (mq.addEventListener) mq.addEventListener("change", onChange);
        else if (mq.addListener) mq.addListener(onChange);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", paint);
    } else {
        paint();
    }

    window.ZZTheme = {
        get: current,
        set: apply
    };
})();
