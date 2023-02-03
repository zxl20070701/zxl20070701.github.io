export default {

    // 系统右键
    system: function () {
        return import('./system/index.js')
    },

    // 桌面右键
    "desktop-line": function () {
        return import('./desktop-line/index.js')
    },

    // 应用右键
    "app": function () {
        return import('./app/index.js')
    }

};