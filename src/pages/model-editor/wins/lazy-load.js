export default {

    // 立方体
    geometry: function () {
        return import('./geometry/index.js')
    },

    // 修改器
    modify: function () {
        return import('./modify/index.js')
    }

};