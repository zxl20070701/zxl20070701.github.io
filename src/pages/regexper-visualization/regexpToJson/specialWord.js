export default function (word) {

    var specialWords = {
        "\\w": "单词",
        "\\W": "非单词",
        "\\d": "数字",
        "\\D": "非数字",
        "\\s": "空白",
        "\\S": "非空白",
        "\\b": "单词边界",
        "\\B": "非单词边界",
        "\\0": "null",
        "\\n": "换行",
        "\\f": "换页",
        "\\t": "tab缩进",
        "\\r": "回车",
        "\\x20": "空格"
    };

    if (word in specialWords) {
        return [specialWords[word], '描述'];
    } else {

        // 还有那种 \1 捕获分组的（考虑到分组个数有限，目前就规定做多9）
        if (/\\[1-9]/.test(word)) {
            return ['分组' + word.replace(/\\/, ''), '描述'];
        }

        // 否则就是普通内容
        return [word.replace(/^\\/, ''), '内容'];
    }

};
