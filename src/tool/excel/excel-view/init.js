import find from '../../xhtml/find';
import setStyle from '../../xhtml/setStyle';
import removeClass from '../../xhtml/removeClass';
import hasClass from '../../xhtml/hasClass';
import bind from '../../xhtml/bind';
import appendTo from '../../xhtml/appendTo';
import { getTargetNode } from '../tool/polyfill';
import { defaultStyle } from '../config';

// 初始化结点

export function initDom() {

    this.__el.innerHTML = "";
    setStyle(this.__el, {
        "background-color": "#f7f7f7",
        "user-select": "none"
    });

};

export function itemInputHandler(event) {
    this.__contentArray[this.__tableIndex].content[+getTargetNode(event).getAttribute('row') - 1][+getTargetNode(event).getAttribute('col') - 1].value = getTargetNode(event).innerText;
};

export function itemMoveHandler(event) {

    if (this.__ismousedown) {

        // 如果本来存在区域，应该取消
        if (this.__region != null) {
            this.$$cancelRegion();
            this.__region = null;
        }

        // 记录下来区域信息
        this.__region = this.$$calcRegionInfo({
            row: this.__rowNum,
            col: this.__colNum,
            rowNum: +this.__target.getAttribute('rowspan'),
            colNum: +this.__target.getAttribute('colspan')
        }, {
            row: +event.target.getAttribute('row'),
            col: +event.target.getAttribute('col'),
            rowNum: +event.target.getAttribute('rowspan'),
            colNum: +event.target.getAttribute('colspan')
        });

        this.$$showRegion();

    }

}

export function itemClickHandler(event) {
    // 如果格式刷按下了
    if (this.__format == true) {

        var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

        var targetStyle = this.__contentArray[this.__tableIndex].content[+getTargetNode(event).getAttribute('row') - 1][+getTargetNode(event).getAttribute('col') - 1].style;

        for (var row = this.__region.info.row[0]; row <= this.__region.info.row[1]; row++) {

            var colNodes = find(rowNodes[row], function () { return true; }, 'th');

            for (var col = this.__region.info.col[0]; col <= this.__region.info.col[1]; col++) {

                // 遍历所有的样式
                for (var key in targetStyle) {

                    // 修改界面显示
                    colNodes[col].style[key] = targetStyle[key];

                    // 修改数据
                    this.__contentArray[this.__tableIndex].content[row - 1][col - 1].style[key] = targetStyle[key];

                }

            }

        }

        // 取消标记格式刷
        this.__format = false;
        removeClass(find(this.__menuQuickDom, function (node) { return node.getAttribute('def-type') == 'format' }, 'span')[0], 'active');

    }

    this.$$moveCursorTo(getTargetNode(event), +getTargetNode(event).getAttribute('row'), +getTargetNode(event).getAttribute('col'));
};

// 初始化视图

export function initTableView(itemTable, index, styleToString) {

    var tableTemplate = "", _this = this;

    // 顶部的
    tableTemplate += "<tr><th class='top-left' excel></th>";
    for (var k = 0; k < itemTable.content[0].length; k++) {
        tableTemplate += "<th class='top-name' excel>" + this.$$calcColName(k) + "</th>";
    }
    tableTemplate += '</tr>';

    // 行
    for (var i = 0; i < itemTable.content.length; i++) {

        tableTemplate += "<tr><th class='line-num' excel>" + (i + 1) + "</th>";

        //  列
        for (var j = 0; j < itemTable.content[i].length; j++) {

            // contenteditable="true" 可编辑状态，则可点击获取焦点，同时内容也是可以编辑的
            // tabindex="0" 点击获取焦点，内容是不可编辑的
            tableTemplate += "<th" +
                " row='" + (i + 1) + "'" +
                " col='" + (j + 1) + "'" +
                ' contenteditable="true"' +
                ' class="item"' +
                ' colspan="' + itemTable.content[i][j].colspan + '"' +
                ' rowspan="' + itemTable.content[i][j].rowspan + '"' +
                ' style="' + styleToString(itemTable.content[i][j].style) + '"' +
                ' excel>' + itemTable.content[i][j].value + '</th>';

        }
        tableTemplate += '</tr>';

    }

    this.__contentDom[index] = appendTo(this.__tableFrame, "<table style='display:none;' class='excel-view' excel>" + tableTemplate + "</table>");

    // 后续动态新增的需要重新绑定

    var items = find(this.__contentDom[index], function (node) { return hasClass(node, 'item') }, 'th');

    bind(items, 'mousedown', function (event) {

        setTimeout(function () {
            if (!_this.__isrightmenu) _this.$$itemClickHandler(event);
        });

    });

    bind(items, 'mousemove', function (event) {

        _this.$$itemMoveHandler(event);

    });

    bind(items, 'input', function (event) {

        _this.$$itemInputHandler(event);

    });

};

var bottomClick = function (target, index) {
    for (var i = 0; i < target.__contentDom.length; i++) {
        if (i == index) {
            setStyle(target.__contentDom[i], {
                'display': 'table'
            });
            target.__btnDom[i].setAttribute('active', 'yes');
        } else {
            setStyle(target.__contentDom[i], {
                'display': 'none'
            });
            target.__btnDom[i].setAttribute('active', 'no');
        }
    }
    target.__tableIndex = index;

    target.$$moveCursorTo(target.__contentDom[index].getElementsByTagName('tr')[1].getElementsByTagName('th')[1], 1, 1);
};

export function initView() {
    var _this = this;

    // 对数据进行校对
    for (var index = 0; index < this.__contentArray.length; index++) {

        var maxColNum = 30;
        for (var row = 0; row < this.__contentArray[index].content.length; row++) {
            maxColNum = Math.max(maxColNum, this.__contentArray[index].content[row].length);
        }

        for (var row = 0; row < this.__contentArray[index].content.length; row++) {
            for (var col = 0; col < maxColNum; col++) {

                if (this.__contentArray[index].content[row][col]) {

                    if (this.__contentArray[index].content[row][col].style) {

                        for (var styleKey in defaultStyle()) {
                            if (styleKey in this.__contentArray[index].content[row][col].style) {
                                // todo
                            } else {
                                this.__contentArray[index].content[row][col].style[styleKey] = defaultStyle()[styleKey];
                            }
                        }
                    } else {
                        this.__contentArray[index].content[row][col].style = defaultStyle();
                    }

                } else {
                    this.__contentArray[index].content[row][col] = {
                        colspan: "1",
                        rowspan: "1",
                        value: "",
                        style: defaultStyle()
                    };
                }
            }
        }

    }

    this.__contentDom = [];
    this.__tableFrame = appendTo(this.__el, "<div></div>");

    setStyle(this.__tableFrame, {
        "width": "100%",
        "height": "calc(100% - 92px)",
        "overflow": "auto"
    });

    for (var index = 0; index < this.__contentArray.length; index++) {

        this.$$initTableView(this.__contentArray[index], index, this.$$styleToString);

        setStyle(this.__contentDom[index], {
            "display": index == 0 ? 'table' : "none"
        });

    }

    this.$$addStyle('excel-view', "" +

        ".excel-view{" +
        "    border-collapse: collapse;" +
        "    width: 100%;" +
        "}" +

        ".excel-view .top-left{" +
        "    border: 1px solid #d6cccb;" +
        "    border-right:none;" +
        "    background-color:white;" +
        "}" +

        ".excel-view .top-name{" +
        "    border: 1px solid #d6cccb;" +
        "    border-bottom:none;" +
        "    color:gray;" +
        "    font-size:12px;" +
        "}" +

        ".excel-view .line-num{" +
        "    padding:0 5px;" +
        "    border: 1px solid #d6cccb;" +
        "    border-right:none;" +
        "    color:gray;" +
        "    font-size:12px;" +
        "}" +

        ".excel-view .item{" +
        "    min-width:50px;" +
        "    white-space: nowrap;" +
        "    border:0.5px solid rgba(85,85,85,0.5);" +
        "    outline:none;" +
        "    font-size:12px;" +
        "    padding:2px;" +
        "}" +

        ".excel-view .item[active='yes']{" +
        "    outline: 2px dashed red;" +
        "}");

    // 添加底部控制选择显示表格按钮
    var bottomBtns = appendTo(this.__el, "<div class='bottom-btn' excel></div>");

    var addBtn = appendTo(bottomBtns, "<span class='add item' excel>+</span>");

    bind(addBtn, 'click', function () {

        // 首先，需要追加数据
        _this.__contentArray.push(_this.$$formatContent()[0]);

        var index = _this.__contentArray.length - 1;

        // 然后添加table

        _this.$$initTableView(_this.__contentArray[index], index, _this.$$styleToString);

        // 添加底部按钮
        var bottomBtn = appendTo(bottomBtns, "<span class='name item' excel>" + _this.__contentArray[index].name + "</span>");
        _this.__btnDom.push(bottomBtn);

        bind(bottomBtn, 'click', function () {
            bottomClick(_this, index);
        });

    });

    this.__btnDom = [];

    for (var index = 0; index < this.__contentArray.length; index++) {
        (function (index) {
            var bottomBtn = appendTo(bottomBtns, "<span class='name item' excel>" + _this.__contentArray[index].name + "</span>");

            // 点击切换显示的视图
            bind(bottomBtn, 'click', function () {
                bottomClick(_this, index);
            });

            // 双击可以修改名字

            bind(bottomBtn, 'dblclick', function () {
                _this.__btnDom[index].setAttribute('contenteditable', 'true');
            });

            bind(bottomBtn, 'blur', function () {
                _this.__contentArray[index].name = bottomBtn.innerText;
            });

            // 登记起来所有的按钮
            _this.__btnDom.push(bottomBtn);
        })(index);
    }

    this.$$addStyle('bottom-btn', "" +

        ".bottom-btn{" +
        "    width: 100%;" +
        "    height: 30px;" +
        "    overflow: auto;" +
        "    border-top: 1px solid #d6cccb;" +
        "    box-sizing: border-box;" +
        "}" +

        ".bottom-btn .item{" +
        "    line-height: 30px;" +
        "    box-sizing: border-box;" +
        "    vertical-align: top;" +
        "    display: inline-block;" +
        "    cursor: pointer;" +
        "}" +

        ".bottom-btn .add{" +
        "    width: 30px;" +
        "    text-align: center;" +
        "    font-size: 18px;" +
        "}" +

        ".bottom-btn .name{" +
        "    font-size: 12px;" +
        "    padding: 0 10px;" +
        "}" +
        ".bottom-btn .name:focus{" +
        "    outline:none;" +
        "}" +

        ".bottom-btn .name:hover{" +
        "    background-color:#efe9e9;" +
        "}" +

        ".bottom-btn .name[active='yes']{" +
        "    background-color:white;" +
        "}");

    // 初始化点击第一个
    this.__btnDom[0].click();

};
