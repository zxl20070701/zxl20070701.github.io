import template from './index.html';
import './index.scss';

export default function (obj) {

    return {
        name: "snipping-tool",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "截图工具" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './snipping.png');
        },
        methods: {

            // 本系统截图
            snippingWebsite: function () {
                alert('此功能未完成，敬请期待！');
            },

            // 真机截图
            snippingComputer: function () {
                alert('此功能未完成，敬请期待！');
            },

            // 下载
            download: function () {
                alert('此功能未完成，敬请期待！');
            },

            // 去编辑
            goImageEditor: function () {
                alert('此功能未完成，敬请期待！');
            }
        }
    };
};