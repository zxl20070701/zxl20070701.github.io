import xhtml from "../../xhtml";

// 更新编辑器内容视图

export function updateView() {

    // 如果有重复利用的行(可复用的过少就不选择这种方法了)
    if (this.__diff && this.__diff.beginNum + this.__diff.endNum > 10) {

        var lineDoms = this.__showDOM.childNodes;
        var lineDoms_length = lineDoms.length;

        // 先删除无用的行

        /**
         * 这里的删除需要稍微注意一下
         * 因为结点删除以后就没有了，这会导致lineDoms的更新，这也是为什么备份数组长度的原因
         * 倒着删除同样是因为这个原因
         */

        for (var i = lineDoms_length - this.__diff.endNum - 1; i >= this.__diff.beginNum; i--) {
            xhtml.remove(lineDoms[i]);
        }

        // 追加不足的行
        if (this.__diff.beginNum > 0) {
            for (var i = this.__formatData.length - 1 - this.__diff.endNum; i >= this.__diff.beginNum; i--) {
                xhtml.after(lineDoms[this.__diff.beginNum - 1], this.$$toTemplate(this.__formatData[i], i, this._noLineNumber));
            }
        } else {

            // 如果开头没有结点保留，为了简单，我们直接采用prependTo方法追加
            for (var i = this.__formatData.length - this.__diff.endNum - 1; i >= 0; i--) {
                xhtml.prependTo(this.__showDOM, this.$$toTemplate(this.__formatData[i], i, this._noLineNumber));
            }

        }

        // 更新行号
        lineDoms = this.__showDOM.childNodes;
        for (var i = this.__diff.beginNum; i < this.__formatData.length; i++) {
            lineDoms[i].getElementsByTagName('em')[0].innerText = i + 1;
        }

    }

    // 有时候，可能直接替换更快
    else if (this.__diff != "not update") {
        var template = "";
        this.__formatData.forEach((line, index) => { template += this.$$toTemplate(line, index, this._noLineNumber); });
        this.__showDOM.innerHTML = template;
    }

    this.__diff = "not update";

    var tempLineDom = this.__showDOM.childNodes[this.__lineNum];
    // 修改当前编辑的行
    if (!this._readonly && this.__lineDom) {
        this.__lineDom.style.backgroundColor = "rgba(0, 0, 0, 0)";
        tempLineDom.style.backgroundColor = this._colorEdit;
    }
    this.__lineDom = tempLineDom;


};

// 更新编辑器选中视图

export function updateSelectView() {

    var ctx = this.__selectCanvas.getContext('2d');
    ctx.fillStyle = this._colorSelect;
    ctx.clearRect(0, 0, this.__selectCanvas.scrollWidth, this.__selectCanvas.scrollHeight);

    // 绘制二个区间
    var drawerSelect = (beginLeftNum, endLeftNum, lineNum) => {

        var xy1 = this.$$calcCanvasXY(beginLeftNum, lineNum);
        var xy2 = this.$$calcCanvasXY(endLeftNum, lineNum);

        // 如何一行过少，前置一点点选中显示
        if (beginLeftNum == endLeftNum && beginLeftNum == 0) {
            ctx.fillRect(xy1.x, xy1.y, 5, 21);
        } else {
            ctx.fillRect(xy1.x, xy1.y, xy2.x - xy1.x, 21);
        }

    };

    // 如果选中区域为空，不用绘制
    if (this.__cursor1.lineNum == this.__cursor2.lineNum && this.__cursor1.leftNum == this.__cursor2.leftNum) return;

    ctx.beginPath();

    // 如果在一行
    if (this.__cursor1.lineNum == this.__cursor2.lineNum) {

        drawerSelect(this.__cursor1.leftNum, this.__cursor2.leftNum, this.__cursor1.lineNum);

    }

    // 如果选中的多于一行
    else {

        var beginCursor, endCursor;

        if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
            beginCursor = this.__cursor1; endCursor = this.__cursor2;
        } else {
            beginCursor = this.__cursor2; endCursor = this.__cursor1;
        }

        // 绘制开始的结尾
        drawerSelect(beginCursor.leftNum, this._contentArray[beginCursor.lineNum].length, beginCursor.lineNum);

        // 绘制结束的开头
        drawerSelect(0, endCursor.leftNum, endCursor.lineNum);

        // 绘制两行之间
        for (var lineNum = beginCursor.lineNum + 1; lineNum < endCursor.lineNum; lineNum++) {
            drawerSelect(0, this._contentArray[lineNum].length, lineNum);
        }

    }

};

// 输入的时候更新光标位置

export function updateCursorPosition() {

    this.__cursorTop = this.__lineNum * 21 + 10;
    this.__cursorLeft = 40 + this.$$textWidth(this._contentArray[this.__lineNum].substring(0, this.__leftNum));

    xhtml.css(this.__focusDOM, {
        top: this.__cursorTop + "px",
        left: this.__cursorLeft + "px",
    });

};

// 更新画布尺寸

export function updateCanvasSize(width, height) {

    if (arguments.length < 2) {
        width = this._el.scrollWidth - 40;
        height = this._el.scrollHeight - 10;
    }

    xhtml.css(this.__selectCanvas, {
        width: width + "px",
        height: height + "px",
    });

    xhtml.attr(this.__selectCanvas, {
        width,
        height
    });

};

// 取消选区

export function cancelSelect() {

    this.$$updateCanvasSize(1, 1);
    this.__cursor1 = { leftNum: 0, lineNum: 0 };
    this.__cursor2 = { leftNum: 0, lineNum: 0 };

};

// 删除选区

export function deleteSelect() {

    // 假定cursor2是结束光标
    var beginCursor = this.__cursor2, endCursor = this.__cursor1;

    // 根据行号来校对
    if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
        beginCursor = this.__cursor1; endCursor = this.__cursor2;
    } else if (this.__cursor1.lineNum == this.__cursor2.lineNum) {

        // 根据列号来校对
        if (this.__cursor1.leftNum < this.__cursor2.leftNum) {
            beginCursor = this.__cursor1; endCursor = this.__cursor2;
        }
    }

    var newLineText =
        this._contentArray[beginCursor.lineNum].substr(0, beginCursor.leftNum) +
        this._contentArray[endCursor.lineNum].substr(endCursor.leftNum)

    this._contentArray.splice(beginCursor.lineNum, endCursor.lineNum - beginCursor.lineNum + 1, newLineText);

    // 校对光标和选区
    this.__leftNum = this.__cursor1.leftNum = this.__cursor2.leftNum = beginCursor.leftNum;
    this.__lineNum = this.__cursor1.lineNum = this.__cursor2.lineNum = beginCursor.lineNum;

    this.$$cancelSelect();
};
