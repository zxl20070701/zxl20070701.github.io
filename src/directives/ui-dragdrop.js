import xhtml from '../tool/xhtml.js';

export default {

    inserted: function (el, binding) {
        binding.value = binding.value || [0, 0, 0, 0];
        el.style.cursor = 'move';

        //绑定鼠标左键按下事件
        xhtml.bind(el, 'mousedown', function mousedown(event) {

            //解决浏览器全选无法拖拽弹框
            el.setCapture && el.setCapture();

            // 寻找窗口轮廓
            var _el = el.parentNode;

            var lf = event.clientX;
            var tp = event.clientY;

            var left = xhtml.getStyle(_el, 'left').replace('px', '');
            var top = xhtml.getStyle(_el, 'top').replace('px', '');

            //绑定鼠标移动事件
            function mousemove(event) {

                var newLeft = left - - event.clientX - lf;
                var newTop = top - - event.clientY - tp;

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
            xhtml.bind(document, 'mousemove', mousemove);

            //绑定鼠标松开事件,清除鼠标移动绑定
            xhtml.bind(document, 'mouseup', function (event) {
                xhtml.unbind(document, 'mousemove', mousemove);
                _el.releaseCapture && _el.releaseCapture();
                return false;
            });
        });

    }

};