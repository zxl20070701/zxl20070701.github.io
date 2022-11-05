
// 计算文字长度

export function textWidth(text) {
    this.__helpCalcDOM.innerText = text;
    return this.__helpCalcDOM.offsetWidth;
};

// 计算最佳光标左边位置

export function bestLeftNum(x, lineNum) {

    if (arguments.length < 2) lineNum = lineNum || this.__lineNum;

    var text = this._contentArray[lineNum];

    if (x <= 40) return 0;
    if (x - 40 >= this.$$textWidth(text)) return text.length;

    var dist = x - 40, i = 1;

    for (; i < text.length; i++) {

        var tempDist = Math.abs(x - 40 - this.$$textWidth(text.substr(0, i)));

        if (tempDist > dist) break;

        dist = tempDist;

    }

    return i - 1;
};

// 计算光标对应的x,y值

export function calcCanvasXY(leftNum, lineNum) {

    return {
        x: this.$$textWidth(this._contentArray[lineNum].substr(0, leftNum)),
        y: lineNum * 21
    };

};

// 判断选区是否为空

export function selectIsNotBlank() {
    return this.__cursor1.lineNum != this.__cursor2.lineNum || this.__cursor1.leftNum != this.__cursor2.leftNum;
};

// 根据内容生成模板

export function toTemplate(line, index, noLineNumber) {
    var template = "";

    template += "<div style='min-width: fit-content;white-space: nowrap;line-height:21px;height:21px;'>";

    var lineStyle = noLineNumber ? "font-size:0;" : "";

    template += "<em style='" + lineStyle + "color:" + this._colorNumber + ";user-select: none;display:inline-block;font-style:normal;width:35px;text-align:right;margin-right:5px;'>" + (index + 1) + "</em>";

    line.forEach(text => {

        var contentText = text.content;

        // 提前对特殊字符进行处理
        contentText = contentText.replace(/\&/g, "&amp;");/*[&]*/
        contentText = contentText.replace(/</g, "&lt;"); contentText = contentText.replace(/>/g, "&gt;");/*[<,>]*/

        template += "<span style='user-select: none;font-weight:" + this._fontWeight + ";white-space: pre;color:" + text.color + "'>" + contentText + "</span>";

    });

    return template + "</div>";
};

// 整理当前输入框信息

export function getInputMessage(editor) {
    return {

        // 光标前面有多少个字符
        leftNum: editor.__leftNum,

        // 当前行之前有多少行
        lineNum: editor.__lineNum,

        // 光标left坐标
        x: editor.__cursorLeft,

        // 光标top坐标
        y: editor.__cursorTop,

        // 一行文本的高
        lineHeight: 21

    };
};