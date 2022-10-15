export default {

    // 首页
    home: function () {
        return import('./home/index.js')
    },

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

    // 视频播放器
    "video-play": function () {
        return import('./video-play/index.js')
    },

    // 贪吃蛇
    "snake-eating": function () {
        return import('./snake-eating/index.js')
    },

    // scss转css
    "scss": function () {
        return import('./scss/index.js')
    },
};