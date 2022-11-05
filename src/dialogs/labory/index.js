import template from './index.html';
import './index.scss';

import lazyExamples from './examples/lazy-load';

import useTemplate from "../../framework/useTemplate";

export default function (obj) {
    return {
        name: "labory",
        render: template,
        methods: {

            // 打开例子或实验代码
            openExample: function (event) {
                var laboryRootEl = document.getElementById('labory-root');

                var exampleEl = document.createElement('div');
                laboryRootEl.appendChild(exampleEl);

                var pagename = event.target.getAttribute('tag');

                var _this = this;
                exampleEl.setAttribute('example-view', '');
                lazyExamples[pagename]().then(function (viewData) {

                    // 挂载页面
                    var exampleInstance = useTemplate(exampleEl, viewData.default);

                    if ('_name' in exampleInstance) {
                        exampleEl.setAttribute('example-view', exampleInstance._name);
                    }

                    // 注册打开弹框方法
                    exampleInstance.$openDialog = _this.$openDialog;

                    // 注册关闭例子方法
                    exampleInstance.$closeExample = function () {
                        laboryRootEl.removeChild(exampleEl);
                    };

                });

            },

            // 取消
            doClose: function () {
                this.$closeDialog();
            },
        }
    };
};