import isElement from '../../type/isElement';

// 移动光标到指定位置
export function moveCursorTo(target, rowNum, colNum) {

    // 如果本来存在区域，应该取消
    if (this.__region != null) {

        this.$$cancelRegion();

        this.__region = null;
    }

    // 如果shift被按下，我们认为是在选择区间
    if (this.__keyLog.shift) {

        // 记录下来区域信息
        this.__region = this.$$calcRegionInfo({
            row: this.__rowNum,
            col: this.__colNum,
            rowNum: +this.__target.getAttribute('rowspan'),
            colNum: +this.__target.getAttribute('colspan')
        }, {
            row: rowNum,
            col: colNum,
            rowNum: +target.getAttribute('rowspan'),
            colNum: +target.getAttribute('colspan')
        });

        this.$$showRegion();

    } else {

        if (isElement(this.__target)) this.__target.setAttribute('active', 'no');

        // 记录当前鼠标的位置

        this.__rowNum = rowNum;
        this.__colNum = colNum;
        this.__target = target;

        // 先获取对应的原始数据

        var oralItemData = this.__contentArray[this.__tableIndex].content[rowNum - 1][colNum - 1];

        // 接着更新顶部菜单

        this.$$updateMenu(oralItemData.style);

        target.setAttribute('active', 'yes');
    }

};
