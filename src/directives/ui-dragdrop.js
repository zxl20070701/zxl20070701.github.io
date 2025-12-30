import bind from "../tool/xhtml/bind";
import unbind from "../tool/xhtml/unbind";
import getStyle from "../tool/xhtml/getStyle";
import { platformName } from '../tool/browser/platform';

var _platformName = platformName();
export default {

    inserted: function (el, binding) {
        var bindingValue = binding.value || [0, 0, 0, 0];
        el.style.cursor = 'move';

        // 寻找窗口轮廓
        var _el = el.parentNode;
        while (getStyle(_el, 'position') == 'static' && _el) {
            _el = _el.parentNode;
        }

        //绑定鼠标左键按下事件
        bind(el, _platformName == 'mobile' ? 'touchstart' : 'mousedown', function mousedown(event) {
            event.stopPropagation();

            //解决浏览器全选无法拖拽弹框
            el.setCapture && el.setCapture();

            var lf = _platformName == 'mobile' ? event.touches[0].clientX : event.clientX;
            var tp = _platformName == 'mobile' ? event.touches[0].clientY : event.clientY;

            if (binding.type == 'desktop') {
                bindingValue = [0, 50 - _el.clientWidth, _el.clientHeight - 50, 50 - _el.clientWidth];
            }

            var left = getStyle(_el, 'left').replace('px', '');
            var top = getStyle(_el, 'top').replace('px', '');

            //绑定鼠标移动事件
            function mousemove(event) {
                event.stopPropagation();

                var newLeft = left - - (_platformName == 'mobile' ? event.touches[0].clientX : event.clientX) - lf;
                var newTop = top - - (_platformName == 'mobile' ? event.touches[0].clientY : event.clientY) - tp;

                // 判断水平是否越界
                if (newLeft > bindingValue[3] && newLeft + _el.clientWidth < window.innerWidth - bindingValue[1]) {
                    _el.style.left = newLeft + 'px';
                }

                // 左越界
                else if (newLeft <= bindingValue[3]) {
                    _el.style.left = bindingValue[3] + 'px';
                }

                // 右越界
                else {
                    _el.style.left = (window.innerWidth - bindingValue[1] - _el.clientWidth) + 'px';
                }

                // 判断垂直是否越界
                if (newTop > bindingValue[0] && newTop + _el.clientHeight < window.innerHeight + bindingValue[2]) {
                    _el.style.top = newTop + 'px';
                }

                // 上越界
                else if (newTop <= bindingValue[0]) {
                    _el.style.top = bindingValue[0] + 'px';
                }

                // 下越界
                else {
                    _el.style.top = (window.innerHeight + bindingValue[2] - _el.clientHeight) + 'px';
                }

                _el.style.right = 'auto';
                _el.style.bottom = 'auto';

            }
            bind(document, _platformName == 'mobile' ? 'touchmove' : 'mousemove', mousemove);

            //绑定鼠标松开事件,清除鼠标移动绑定
            bind(document, _platformName == 'mobile' ? 'touchend' : 'mouseup', function (event) {
                event.stopPropagation();

                unbind(document, _platformName == 'mobile' ? 'touchmove' : 'mousemove', mousemove);
                _el.releaseCapture && _el.releaseCapture();
                return false;
            });
        });

    }

};