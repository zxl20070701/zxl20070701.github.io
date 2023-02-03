
// 主要用于计算文字的宽

export default function (texts, helpEl) {
    helpEl.innerText = texts;
    var width = helpEl.clientWidth;
    return width < 14 ? 14 : width;

};
