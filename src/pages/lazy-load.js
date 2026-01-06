export default {

    // 正则表达式可视化
    "regexper-visualization": function () {
        return import('./regexper-visualization/index.js')
    },

    // npm包下载统计
    "npm-download": function () {
        return import('./npm-download/index.js')
    },

    // 录屏软件
    "recorder-screen": function () {
        return import('./recorder-screen/index.js')
    },

    // 图片编辑器
    "image-editor": function () {
        return import('./image-editor/index.js')
    },

    // 代码编辑器
    "code-editor": function () {
        return import('./code-editor/index.js')
    },

    // 贪吃蛇
    "snake-eating": function () {
        return import('./snake-eating/index.js')
    },

    // 截图工具
    "snipping-tool": function () {
        return import('./snipping-tool/index.js')
    },
};