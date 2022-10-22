export default {

    // 画布或图像大小
    size: function () {
        return import('./size/index.js')
    },

    // 保存
    save: function () {
        return import('./save/index.js')
    }

};