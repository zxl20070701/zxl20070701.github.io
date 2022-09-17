
// 主要用于计算文字的宽

export default function (texts) {

    var helpHidden = document.getElementById('help-hidden');
    helpHidden.innerText = texts;
    var width = helpHidden.clientWidth;
    return width < 14 ? 14 : width;

};
