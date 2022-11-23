const template = require('./src/pages/home/index.html', true);
require('./src/pages/home/index.scss', true);

export default function (obj, props) {
    return {
        render: template,
        data: {

        },
        methods: {
            goto(event, target) {
                this.$openWindow(target.getAttribute('tag'));
            },

            // 打开h5版本的首页
            openH5Page() {
                require('electron').shell.openExternal("https://zxl20070701.github.io/toolbox/");
            },

            // 代码仓库
            openRepPage() {
                require('electron').shell.openExternal("https://github.com/zxl20070701/toolbox");
            },

            // 文档笔记
            openNoteBookPage() {
                require('electron').shell.openExternal("https://zxl20070701.github.io/notebook");
            },

        }
    };
};