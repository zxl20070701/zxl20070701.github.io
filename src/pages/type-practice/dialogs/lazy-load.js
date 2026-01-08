export default {

    // 键盘练习
    "keyboard": function () {
        return import('./keyboard/index.js')
    },

    // 英文打字
    "english": function () {
        return import('./english/index.js')
    },

    // 拼音打字
    "pinyin": function () {
        return import('./pinyin/index.js')
    }
};