export default {

    // 正则表达式可视化
    "regexper-visualization": function () {
        return import('./regexper-visualization/index.js')
    },

    // 音频编辑器
    "audio-editor": function () {
        return import('./audio-editor/index.js')
    },

    // 格式化JSON字符串
    "format-json": function () {
        return import('./format-json/index.js')
    },

    // 图片编辑器
    "image-editor": function () {
        return import('./image-editor/index.js')
    },

    // 模型编辑器
    "model-editor": function () {
        return import('./model-editor/index.js')
    },

    // 贪吃蛇
    "snake-eating": function () {
        return import('./snake-eating/index.js')
    },

    // scss转css
    "scss": function () {
        return import('./scss/index.js')
    },

    // 代码编辑器
    "code-editor": function () {
        return import('./code-editor/index.js')
    },

    // 录屏软件
    "recorder-screen": function () {
        return import('./recorder-screen/index.js')
    },

    // 浏览器
    "browser": function () {
        return import('./browser/index.js')
    },

    // geoJSON查看器
    "geo-json": function () {
        return import('./geo-json/index.js')
    },

    // 我的电脑
    "computer": function () {
        return import('./computer/index.js')
    },

    // 应用中心
    "application": function () {
        return import('./application/index.js')
    }
};