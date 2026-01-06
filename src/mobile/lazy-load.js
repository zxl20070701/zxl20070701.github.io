export default {

    // 文件管理器
    "file-manager": function () {
        return import('./file-manager/index.js')
    },

    // 浏览器
    "browser": function () {
        return import('./browser/index.js')
    },

    // 记事本
    "notepad": function () {
        return import('./notepad/index.js')
    },

    // 设置
    "setting": function () {
        return import('./setting/index.js')
    },

    // npm包下载统计
    "npm-download": function () {
        return import('./npm-download/index.js')
    },

    // 录屏软件
    "recorder-screen": function () {
        return import('./recorder-screen/index.js')
    },

    // 正则表达式可视化
    "regexper-visualization": function () {
        return import('./regexper-visualization/index.js')
    },

};