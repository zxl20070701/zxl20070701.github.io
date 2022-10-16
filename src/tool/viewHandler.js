// 屏幕3D控制信息捕获

import xhtml from './xhtml';
import getKeyCode from './keyCode';

export default function (callback) {

    var el = document.getElementsByTagName('body')[0];

    // 键盘控制
    getKeyCode(function (keyCode) {
        callback({
            type: {
                up: "lookUp", // 向上
                down: "lookDown", // 向下
                left: "lookLeft", // 向左
                right: "lookRight", // 向右
            }[keyCode]
        });
    });

    // 鼠标控制
    var mouseP = null;
    var doMove = function (event) {
        if (mouseP == null) return;

        var tempMouseP = xhtml.mousePosition(el, event);

        // 先求解出轨迹向量
        var normal = [tempMouseP.x - mouseP.x, mouseP.y - tempMouseP.y];

        // 方向向量旋转90deg得到选择向量
        var rotateNormal = [
            normal[1],
            normal[0] * -1,
            0
        ]

        // 非法射线忽略
        if (rotateNormal[0] == 0 && rotateNormal[1] == 0) return;

        callback({
            type: "rotate",
            normal: rotateNormal,
            dist: Math.abs(tempMouseP.x - mouseP.x) + Math.abs(tempMouseP.y - mouseP.y)
        });

        mouseP = tempMouseP;
    };

    xhtml.bind(el, 'mousedown', function (event) {
        mouseP = xhtml.mousePosition(el, event);
    });
    xhtml.bind(el, 'mouseup', function (event) {
        mouseP = null;
    });
    xhtml.bind(el, 'mousemove', function (event) {
        doMove(event);
    });

    // 手指控制
    xhtml.bind(el, 'touchend', function (event) {
        mouseP = null;
    });
    xhtml.bind(el, 'touchstart', function (event) {
        mouseP = xhtml.mousePosition(el, event.touches[0]);
    });
    xhtml.bind(el, 'touchmove', function (event) {
        doMove(event.touches[0]);
    });

    let doScale = function (value) {
        if (value == 0) return;

        callback({
            type: "scale",
            kind: value < 0 ? "reduce" : "enlarge",
            rate: Math.abs(value),
        });
    };

    // 滚轮控制
    xhtml.bind(el, 'mousewheel', function (event) {
        doScale(event.wheelDelta);
    });

    if (window.addEventListener) {

        // 针对火狐浏览器
        window.addEventListener('DOMMouseScroll', function (event) {
            doScale(-1 * event.detail);
        }, false);
    }

};
