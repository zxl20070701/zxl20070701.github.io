import { platformName } from './tool/browser/platform';
var _platformName = platformName();

import useTemplate from "./framework/useTemplate";

import lazyLoad from "./lazy-load";

import './common.scss';

// 桌面壁纸
document.body.style.backgroundImage = "url(./" + _platformName + "-desktop.jpeg)";

// 系统名称
window.systeNameEn = _platformName;
window.systeName = {
    "pc": " - Windows 7 定制版本",
    "mobile": " - iPhone 13 定制版本"
}[_platformName];

// 应用列表
lazyLoad[_platformName + "Pages"]().then(function (data1) {
    var pageHeight = "100vh";

    if (_platformName == 'mobile') {
        var trueHeight = document.getElementById('help-height').clientHeight;
        document.body.style.height = trueHeight + "px";

        pageHeight = trueHeight + "px";
    } else {
        document.body.style.height = "100vh";
    }
    document.body.removeChild(document.getElementById('help-height'));

    // 设置高变量
    var styleEl = document.createElement('style');
    styleEl.innerHTML = ":root { --height:" + pageHeight + " }";
    document.getElementsByTagName('head')[0].appendChild(styleEl);

    // 启动桌面
    lazyLoad[_platformName + "Desktop"]().then(function (data2) {
        var desktopOption = data2.default;

        // 启动桌面
        useTemplate(document.getElementById("desktop-root"), desktopOption);

        var goDesktop = function (init) {
            if (!init) window.location.href = "#/desktop";

            document.getElementsByTagName('title')[0].innerText = "桌面" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', {
                "pc": './windows7.png',
                "mobile": './iphone.png'
            }[_platformName]);
        };

        // 启动
        goDesktop(true);
    });

});