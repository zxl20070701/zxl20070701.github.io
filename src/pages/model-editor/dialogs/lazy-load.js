export default {

    // 保存
    save: function () {
        return import('./save/index.js')
    },

    // 立方体
    geometry: function () {
        return import('./geometry/index.js')
    }

};