
// 外来文本统一过滤处理

export default function (oralStr) {

    // 把tab统一变成空格
    var tab = "";
    for (var i = 0; i < this._tabSpace; i++) {
        tab += " ";
    }

    return oralStr.replace(/\t/g, tab);
};