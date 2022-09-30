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
    }

};