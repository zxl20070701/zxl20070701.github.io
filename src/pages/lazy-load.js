export default {

    // 正则表达式可视化
    "regexper-visualization": function () {
        return import('./regexper-visualization/index.js')
    },

    // 音频编辑器
    "audio-editor": function () {
        return import('./audio-editor/index.js')
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

    // 可视化图表
    "echarts": function () {
        return import('./echarts/index.js')
    },

    // 金山打字通
    "type-practice": function () {
        return import('./type-practice/index.js')
    },

    // Excel 表格
    "excel": function () {
        return import('./excel/index.js')
    },

    // 浏览器
    "browser": function () {
        return import('./browser/index.js')
    },

    // 模型编辑器
    "model-editor": function () {
        return import('./model-editor/index.js')
    },
};