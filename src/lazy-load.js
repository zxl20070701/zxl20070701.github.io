export default {

    // PC
    "pcDesktop": function () {
        return import('./pages/desktop/index.js')
    },

    // Mobile
    "mobileDesktop": function () {
        return import('./mobile/desktop/index.js')
    },

    // PC应用列表
    "pcPages": function () {
        return import('./pages/lazy-load.js')
    },

    // Mobile应用列表
    "mobilePages": function () {
        return import('./mobile/lazy-load.js')
    }

};