import bind from "../tool/xhtml/bind";
import unbind from "../tool/xhtml/unbind";
import getStyle from "../tool/xhtml/getStyle";

export default {

    inserted: function (el, binding) {
        binding.value = binding.value || [0, 0, 0, 0];
        el.style.cursor = 'move';

        //绑定鼠标左键按下事件
        bind(el, 'mousedown', function mousedown(event) {

            //解决浏览器全选无法拖拽弹框
            el.setCapture && el.setCapture();

            // 寻找窗口轮廓
            var _el = el.parentNode;

            var lf = event.clientX;
            var tp = event.clientY;

            var left = getStyle(_el, 'left').replace('px', '');
            var top = getStyle(_el, 'top').replace('px', '');

            //绑定鼠标移动事件
            function mousemove(event) {

                var newLeft = left - - event.clientX - lf;
                var newTop = top - - event.clientY - tp;

                // 有缩放
                if (window.scale) {
                    _el.style.left = newLeft + 'px';
                    _el.style.top = newTop + 'px';
                }

                // 无缩放
                else {

                    // 判断水平是否越界
                    if (newLeft > binding.value[3] && newLeft + _el.clientWidth < window.innerWidth - binding.value[1]) {
                        _el.style.left = newLeft + 'px';
                    }

                    // 左越界
                    else if (newLeft <= binding.value[3]) {
                        _el.style.left = binding.value[3] + 'px';
                    }

                    // 右越界
                    else {
                        _el.style.left = (window.innerWidth - binding.value[1] - _el.clientWidth) + 'px';
                    }

                    // 判断垂直是否越界
                    if (newTop > binding.value[0] && newTop + _el.clientHeight < window.innerHeight + binding.value[2]) {
                        _el.style.top = newTop + 'px';
                    }

                    // 上越界
                    else if (newTop <= binding.value[0]) {
                        _el.style.top = binding.value[0] + 'px';
                    }

                    // 下越界
                    else {
                        _el.style.top = (window.innerHeight + binding.value[2] - _el.clientHeight) + 'px';
                    }
                }

            }
            bind(document, 'mousemove', mousemove);

            //绑定鼠标松开事件,清除鼠标移动绑定
            bind(document, 'mouseup', function (event) {
                unbind(document, 'mousemove', mousemove);
                _el.releaseCapture && _el.releaseCapture();
                return false;
            });
        });

    }

};