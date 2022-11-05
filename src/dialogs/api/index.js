import template from './index.html';
import './index.scss';

import lazyApiPages from "./pages/lazy-load";
import useTemplate from '../../framework/useTemplate';
import animation from '../../tool/animation';

var preNavEl = null;
export default function (obj, props) {
    return {
        name: "api",
        render: template,
        mounted: function () {
            document.getElementById('init-api-el').click();
        },
        methods: {

            // 关闭
            doClose: function () {
                this.$closeDialog();
            },

            // 加载文档页面
            loadApiPage: function (event) {

                var navEl = event.target.nextElementSibling;
                var apiContentEl = document.getElementById('api-content');

                lazyApiPages[event.target.getAttribute('tag')]().then(function (data) {

                    // 初始化环境

                    if (preNavEl) preNavEl.innerHTML = "";
                    navEl.innerHTML = "";
                    apiContentEl.innerHTML = "";

                    preNavEl = navEl;

                    apiContentEl.scrollTop = 0;

                    // 挂载页面
                    useTemplate(apiContentEl, data.default);

                    // 生成导航菜单
                    // 动态生成左侧菜单
                    var els = apiContentEl.children;
                    for (var index = 0; index < els.length; index++) {
                        (function (index) {
                            if (["H2", "H3", "H4"].indexOf(els[index].nodeName) > -1) {
                                var itemEl = document.createElement(els[index].nodeName);
                                navEl.appendChild(itemEl);

                                itemEl.innerHTML = els[index].innerHTML;

                                itemEl.addEventListener('click', function () {

                                    var offsetTop = els[index].offsetTop - 50;
                                    var currentScrollTop = apiContentEl.scrollTop || 0;

                                    animation(
                                        function (deep) {
                                            apiContentEl.scrollTop =
                                                (offsetTop - currentScrollTop) * deep + currentScrollTop;
                                        },
                                        500,
                                        function () {
                                            apiContentEl.scrollTop = offsetTop;
                                        }
                                    );

                                });

                            }
                        })(index);
                    }

                });

            }
        }
    }
};