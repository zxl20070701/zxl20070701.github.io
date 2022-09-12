import useTemplate from "./framework/useTemplate";

import urlFormat from "./tool/urlFormat";
import lazyLoad from "./pages/lazy-load";

import './common.scss';

// 浏览器兼容文件
import './polyfill/Promise';

var pagename = urlFormat().router[0]
var el = document.getElementById('root');

// 默认打开主页
if (!(pagename in lazyLoad)) pagename = "home";

lazyLoad[pagename]().then(function (data) {

    // 挂载页面
    useTemplate(el, data.default);

});