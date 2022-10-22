import template from './index.html';
import './index.scss';

export default function (obj) {
    return {
        render: template,
        data: {
            nav: obj.ref('folder')
        },
        beforeMount: function () {
            document.getElementsByTagName('title')[0].innerText = "代码编辑器";
            document.getElementById('icon-logo').setAttribute('href', './code-editor.png');
        },
        methods: {

            // 切换功能
            changeNav: function (event) {
                this.nav = event.target.getAttribute('tag');
            },

            // 打开文件夹
            openFolder: function () {

            },

            // 打开文件
            openFile: function () {

            }

        }
    };
};