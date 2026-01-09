
/*************************** [bundle] ****************************/
// Original file:./src/pages/excel/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['79']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('218');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('219');


__pkg__scope_args__=window.__pkg__getBundle('220');
var Excel =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {

    return {
        name: "excel",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "Excel" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './excel.png');
        },
        methods: {

        },
        mounted: function () {
            new Excel({
                el: this._refs.excel.value,
                content: {
                    version: "v1",
                    filename: "Excel",
                    contents: [{
                        name: "食物列表",
                        content: [
                            [
                                { colspan: 1, rowspan: 2, value: "序号", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 2, value: "名称", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 2, rowspan: 1, value: "分类", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                                { colspan: 1, rowspan: 2, value: "价格", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 2, value: "备注", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } }
                            ],
                            [
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                                { colspan: 1, rowspan: 1, value: "大类", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 1, value: "小类", style: { "vertical-align": "middle", "text-align": "center", "color": "rgb(255, 255, 255)", "background": "rgb(238, 121, 118)" } },
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                                { colspan: 1, rowspan: 1, value: "", style: { display: "none" } },
                            ], [
                                { colspan: 1, rowspan: 1, value: "001" },
                                { colspan: 1, rowspan: 1, value: "苹果" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果" },
                                { colspan: 1, rowspan: 1, value: "6.2¥/kg" },
                                { colspan: 1, rowspan: 1, value: "" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "002" },
                                { colspan: 1, rowspan: 1, value: "西瓜" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果" },
                                { colspan: 1, rowspan: 1, value: "10.4¥/kg" },
                                { colspan: 1, rowspan: 1, value: "" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "003" },
                                { colspan: 1, rowspan: 1, value: "猪肉" },
                                { colspan: 1, rowspan: 1, value: "动物" },
                                { colspan: 1, rowspan: 1, value: "肉类" },
                                { colspan: 1, rowspan: 1, value: "10.5¥/kg" },
                                { colspan: 1, rowspan: 1, value: "" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "004" },
                                { colspan: 1, rowspan: 1, value: "榴莲" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果" },
                                { colspan: 1, rowspan: 1, value: "59¥/kg" },
                                { colspan: 1, rowspan: 1, value: "不好吃，多次尝试失败，难以下咽" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "005" },
                                { colspan: 1, rowspan: 1, value: "西红柿" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果&蔬菜" },
                                { colspan: 1, rowspan: 1, value: "4.7¥/kg" },
                                { colspan: 1, rowspan: 1, value: "" }
                            ], [
                                { colspan: 1, rowspan: 1, value: "006" },
                                { colspan: 1, rowspan: 1, value: "橘子" },
                                { colspan: 1, rowspan: 1, value: "植物" },
                                { colspan: 1, rowspan: 1, value: "水果" },
                                { colspan: 1, rowspan: 1, value: "5.9¥/kg" },
                                { colspan: 1, rowspan: 1, value: "yyds，非常好吃，爱了爱了" }
                            ], [], [], [], [], [], []
                        ]
                    }, {
                        name: "未命名",
                        content: [
                            [], [], [], [], [], [], [], []
                        ]
                    }]
                }

            });

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/excel/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['218']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,7]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[3,5]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[4]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"Excel 表格","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content","ref":"excel"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/excel/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['219']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"excel\"]{\n\nwidth: calc(100vw - 100px);\n\nleft: 50px;\n\ntop: 20px;\n\n}\n\n [page-view=\"excel\"][focus=\"no\"]>header{\n\nbackground-color: #fafafa;\n\n}\n\n [page-view=\"excel\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #ffffff;\n\nbox-shadow: -3px 3px 20px #d2d2db;\n\n}\n\n [page-view=\"excel\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./excel.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"excel\"]>div.content{\n\nheight: calc(100vh - 120px);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/index
/*****************************************************************/
window.__pkg__bundleSrc__['220']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('48');
var isElement =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;


// 核心方法和工具方法

__pkg__scope_args__=window.__pkg__getBundle('221');
var initDom=__pkg__scope_args__.initDom;
var initView=__pkg__scope_args__.initView;
var initTableView=__pkg__scope_args__.initTableView;
var itemClickHandler=__pkg__scope_args__.itemClickHandler;
var itemInputHandler=__pkg__scope_args__.itemInputHandler;
var itemMoveHandler=__pkg__scope_args__.itemMoveHandler;

__pkg__scope_args__=window.__pkg__getBundle('227');
var formatContent=__pkg__scope_args__.formatContent;
var calcColName=__pkg__scope_args__.calcColName;
var styleToString=__pkg__scope_args__.styleToString;
var newItemData=__pkg__scope_args__.newItemData;
var getLeftTop=__pkg__scope_args__.getLeftTop;


__pkg__scope_args__=window.__pkg__getBundle('228');
var style =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('229');
var moveCursorTo=__pkg__scope_args__.moveCursorTo;

__pkg__scope_args__=window.__pkg__getBundle('230');
var setItemStyle=__pkg__scope_args__.setItemStyle;

__pkg__scope_args__=window.__pkg__getBundle('231');
var calcRegionInfo=__pkg__scope_args__.calcRegionInfo;
var showRegion=__pkg__scope_args__.showRegion;
var cancelRegion=__pkg__scope_args__.cancelRegion;


// 键盘交互总控

__pkg__scope_args__=window.__pkg__getBundle('232');
var renderKeyboard =__pkg__scope_args__.default;


// 挂载顶部菜单

__pkg__scope_args__=window.__pkg__getBundle('233');
var menu =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('235');
var updateMenu =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('237');
var menuHandler =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('238');
var insertUp=__pkg__scope_args__.insertUp;
var insertDown=__pkg__scope_args__.insertDown;
var insertLeft=__pkg__scope_args__.insertLeft;
var insertRight=__pkg__scope_args__.insertRight;

__pkg__scope_args__=window.__pkg__getBundle('240');
var deleteRow=__pkg__scope_args__.deleteRow;
var deleteCol=__pkg__scope_args__.deleteCol;


// 挂载右键菜单

__pkg__scope_args__=window.__pkg__getBundle('241');
var rightMenu =__pkg__scope_args__.default;


var Excel = function (options) {
    var _this = this;

    if (!(this instanceof Excel)) {
        throw new Error('Excel is a constructor and should be called with the `new` keyword');
    }

    // 编辑器挂载点
    if (isElement(options.el)) {

        this.__el = options.el;

        // 内容
        this.__contentArray = this.$$formatContent(options.content);

        // 用于选择记录区域
        this.__region = null;

        // 用于记录是否按下了格式刷按钮
        this.__format = false;

        // 记录鼠标是否按下
        this.__ismousedown = false;

        // 记录鼠标右键菜单是否打开
        this.__isrightmenu = false;

        bind(options.el, 'mousedown', function () {
            _this.__ismousedown = true;
            _this.__isrightmenu = false;
            _this.__rightMenuDom.style.display = 'none';
        });

        bind(options.el, 'mouseup', function () {
            _this.__ismousedown = false;
        });

        bind(options.el, 'contextmenu', function (event) {
            event.preventDefault();

            _this.__rightMenuDom.style.left = event.clientX + "px";
            _this.__rightMenuDom.style.top = event.clientY + "px";

            // 标记鼠标右键菜单被打开
            _this.__isrightmenu = true;
            _this.__rightMenuDom.style.display = 'block';

        });

    } else {

        // 挂载点是必须的，一定要有
        throw new Error('options.el is not a element!');
    }

    // 启动键盘事件监听
    this.$$renderKeyboard();

    // 先初始化DOM
    this.$$initDom();

    // 挂载菜单
    this.$$createdMenu();

    // 挂载右键菜单
    this.$$createRightMenu();
    this.__rightMenuDom.style.display = 'none';

    // 初始化视图
    this.$$initView();

    // 获取当前Excel内容
    this.valueOf = function (content) {

        // 如果有值，就是设置
        if (content) {

            _this.__contentArray = this.$$formatContent(content);

            var els = _this.__el.children;
            els[2].parentNode.removeChild(els[2]);
            els[1].parentNode.removeChild(els[1]);

            _this.$$initView();

            return _this;
        }

        return {
            version: "v1",
            filename: "Excel",
            contents: _this.__contentArray
        };
    };

};

// 挂载辅助方法

Excel.prototype.$$formatContent = formatContent;
Excel.prototype.$$calcColName = calcColName;
Excel.prototype.$$addStyle = style();
Excel.prototype.$$styleToString = styleToString;
Excel.prototype.$$newItemData = newItemData;
Excel.prototype.$$itemClickHandler = itemClickHandler;
Excel.prototype.$$itemInputHandler = itemInputHandler;
Excel.prototype.$$itemMoveHandler = itemMoveHandler;
Excel.prototype.$$getLeftTop = getLeftTop;

// 挂载核心方法

Excel.prototype.$$initDom = initDom;
Excel.prototype.$$initView = initView;
Excel.prototype.$$initTableView = initTableView;

Excel.prototype.$$createdMenu = menu;
Excel.prototype.$$updateMenu = updateMenu;
Excel.prototype.$$menuHandler = menuHandler;

Excel.prototype.$$moveCursorTo = moveCursorTo;
Excel.prototype.$$setItemStyle = setItemStyle;

Excel.prototype.$$calcRegionInfo = calcRegionInfo;
Excel.prototype.$$showRegion = showRegion;
Excel.prototype.$$cancelRegion = cancelRegion;

Excel.prototype.$$insertUpNewRow = insertUp;
Excel.prototype.$$insertDownNewRow = insertDown;
Excel.prototype.$$insertLeftNewCol = insertLeft;
Excel.prototype.$$insertRightNewCol = insertRight;

Excel.prototype.$$deleteCurrentRow = deleteRow;
Excel.prototype.$$deleteCurrentCol = deleteCol;

Excel.prototype.$$createRightMenu = rightMenu;

// 挂载键盘交互总控

Excel.prototype.$$renderKeyboard = renderKeyboard;

__pkg__scope_bundle__.default= Excel;


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/excel-view/init
/*****************************************************************/
window.__pkg__bundleSrc__['221']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('222');
var find =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('169');
var setStyle =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('223');
var removeClass =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('224');
var hasClass =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('47');
var appendTo =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('225');
var getTargetNode=__pkg__scope_args__.getTargetNode;

__pkg__scope_args__=window.__pkg__getBundle('226');
var defaultStyle=__pkg__scope_args__.defaultStyle;


// 初始化结点

__pkg__scope_bundle__.initDom=function() {

    this.__el.innerHTML = "";
    setStyle(this.__el, {
        "background-color": "#f7f7f7",
        "user-select": "none"
    });

};

__pkg__scope_bundle__.itemInputHandler=function(event) {
    this.__contentArray[this.__tableIndex].content[+getTargetNode(event).getAttribute('row') - 1][+getTargetNode(event).getAttribute('col') - 1].value = getTargetNode(event).innerText;
};

__pkg__scope_bundle__.itemMoveHandler=function(event) {

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

__pkg__scope_bundle__.itemClickHandler=function(event) {
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

__pkg__scope_bundle__.initTableView=function(itemTable, index, styleToString) {

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

__pkg__scope_bundle__.initView=function() {
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


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/find
/*****************************************************************/
window.__pkg__bundleSrc__['222']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('48');
var isElement =__pkg__scope_args__.default;


// 在当前上下文context上查找结点
// selectFun可选，返回boolean用以判断当前面对的结点是否保留
__pkg__scope_bundle__.default= function (context, selectFun, tagName) {
    if (!isElement(context)) return [];
    var nodes = context.getElementsByTagName(tagName || '*');
    var result = [];
    for (var i = 0; i < nodes.length; i++) {
        if (isElement(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i])))
            result.push(nodes[i]);
    }
    return result;
}

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/setStyle
/*****************************************************************/
window.__pkg__bundleSrc__['169']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 修改样式
__pkg__scope_bundle__.default= function (el, styles) {
    for (var key in styles) {
        el.style[key] = styles[key];
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/removeClass
/*****************************************************************/
window.__pkg__bundleSrc__['223']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 删除指定class
__pkg__scope_bundle__.default= function (dom, clazz) {
    var oldClazz = " " + (dom.getAttribute('class') || "") + " ";
    var newClazz = oldClazz.replace(" " + clazz.trim() + " ", " ");
    dom.setAttribute('class', newClazz.trim());
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/hasClass
/*****************************************************************/
window.__pkg__bundleSrc__['224']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 判断结点是否有指定class
// clazzs可以是字符串或数组字符串
// notStrict可选，boolean值，默认false表示结点必须包含全部class,true表示至少包含一个即可
__pkg__scope_bundle__.default= function (dom, clazzs, notStrict) {
    if (clazzs.constructor !== Array) clazzs = [clazzs];

    var class_str = " " + (dom.getAttribute('class') || "") + " ";
    for (var i = 0; i < clazzs.length; i++) {
        if (class_str.indexOf(" " + clazzs[i] + " ") >= 0) {
            if (notStrict) return true;
        } else {
            if (!notStrict) return false;
        }
    }
    return true;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/tool/polyfill
/*****************************************************************/
window.__pkg__bundleSrc__['225']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.getTargetNode=function(event) {
    var _event = event || window.event;
    return _event.target || _event.srcElement;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/config
/*****************************************************************/
window.__pkg__bundleSrc__['226']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.defaultStyle = function () {
    return {
        display: "table-cell",
        color: 'black',
        background: 'white',
        'vertical-align': 'top',
        'text-align': 'left',
        'font-weight': "normal",// bold粗体
        'font-style': 'normal',// italic斜体
        'text-decoration': 'none'// line-through中划线 underline下划线
    };
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/excel-view/tool
/*****************************************************************/
window.__pkg__bundleSrc__['227']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('50');
var isNumber =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('226');
var defaultStyle=__pkg__scope_args__.defaultStyle;


__pkg__scope_bundle__.styleToString=function(style) {

    var styleString = "";
    for (var key in style) {
        styleString += key + ":" + style[key] + ';';
    }

    return styleString;
};

__pkg__scope_bundle__.newItemData=function() {
    return {
        value: " ", colspan: "1", rowspan: "1",
        style: defaultStyle()
    };
};

__pkg__scope_bundle__.formatContent=function(file) {

    // 如果传递了内容
    if (file && 'version' in file && file.filename == 'Excel') {

        // 后续如果格式进行了升级，可以格式兼容转换成最新版本
        return file.contents;
    }

    // 否则，自动初始化
    else {

        var content = [];
        for (var i = 0; i < 100; i++) {
            var rowArray = []
            for (var j = 0; j < 30; j++) {
                rowArray.push(this.$$newItemData());
            }

            content.push(rowArray);
        }
        return [{
            name: "未命名",
            content
        }];
    }

};

__pkg__scope_bundle__.calcColName=function(index) {
    if (!isNumber(index)) return index;

    var codes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var result = "";

    while (true) {

        // 求解当前坐标
        var _index = index % 26;

        // 拼接
        result = codes[_index] + result;

        // 求解余下的数
        index = Math.floor(index / 26);

        if (index == 0) break;

        index -= 1;
    }
    return result;
};

__pkg__scope_bundle__.getLeftTop=function(rowIndex, colIndex) {
    var content = this.__contentArray[this.__tableIndex].content;

    // 从下到上
    for (var row = rowIndex; row >= 1; row--) {
        // 从右到左
        for (var col = colIndex; col >= 1; col--) {

            // 同一行如果遇到第一个显示的，只有两种可能：
            // 1.这个就是所求
            // 2.本行都不会有结果
            if (content[row - 1][col - 1].style.display != 'none') {

                // 如果目标可以包含自己，那就找到了
                if (
                    content[row - 1][col - 1].rowspan - - row > rowIndex
                    &&
                    content[row - 1][col - 1].colspan - - col > colIndex
                ) {

                    return {
                        row,
                        col,
                        content: content[row - 1][col - 1]
                    };

                } else {
                    break;
                }

            }

            // 不加else的原因是，理论上一定会存在唯一的一个

        }
    }
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/tool/style
/*****************************************************************/
window.__pkg__bundleSrc__['228']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
var addUniqueNamespace = function (style) {

    var uniqueNameSpace = 'excel';

    style = style.replace(/( {0,}){/g, "{");
    style = style.replace(/( {0,}),/g, ",");

    var temp = "";
    // 分别表示：是否处于注释中、是否处于内容中、是否由于特殊情况在遇到{前完成了hash
    var isSpecial = false, isContent = false, hadComplete = false;
    for (var i = 0; i < style.length; i++) {
        if (style[i] == ':' && !isSpecial && !hadComplete && !isContent) {
            hadComplete = true;
            temp += "[" + uniqueNameSpace + "]";
        } else if (style[i] == '{' && !isSpecial) {
            isContent = true;
            if (!hadComplete) temp += "[" + uniqueNameSpace + "]";
        } else if (style[i] == '}' && !isSpecial) {
            isContent = false;
            hadComplete = false;
        } else if (style[i] == '/' && style[i + 1] == '*') {
            isSpecial = true;
        } else if (style[i] == '*' && style[i + 1] == '/') {
            isSpecial = false;
        } else if (style[i] == ',' && !isSpecial && !isContent) {
            if (!hadComplete) temp += "[" + uniqueNameSpace + "]";
            hadComplete = false;
        }

        temp += style[i];

    }

    return temp;

};

__pkg__scope_bundle__.default= function () {

    if ('excel@style' in window) {
        // todo
    } else {
        window['excel@style'] = {};
    }

    var head = document.head || document.getElementsByTagName('head')[0];

    return function (keyName, styleString) {
        if (window['excel@style'][keyName]) {
            // todo
        } else {
            window['excel@style'][keyName] = true;

            // 创建style标签
            var styleElement = document.createElement('style');
            styleElement.setAttribute('type', 'text/css');

            // 写入样式内容
            // 添加统一的后缀是防止污染
            styleElement.innerHTML = addUniqueNamespace(styleString);

            // 添加到页面
            head.appendChild(styleElement);
        }
    };
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/excel-view/cursor
/*****************************************************************/
window.__pkg__bundleSrc__['229']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('48');
var isElement =__pkg__scope_args__.default;


// 移动光标到指定位置
__pkg__scope_bundle__.moveCursorTo=function(target, rowNum, colNum) {

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


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/excel-view/modify
/*****************************************************************/
window.__pkg__bundleSrc__['230']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 修改默认输入条目的样式
__pkg__scope_bundle__.setItemStyle=function(key, value) {

    // 更新数据内容
    this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][this.__colNum - 1].style[key] = value;

    // 更新输入条目
    this.__target.style[key] = value;

    // 更新菜单状态
    this.$$updateMenu(this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][this.__colNum - 1].style);

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/excel-view/region
/*****************************************************************/
window.__pkg__bundleSrc__['231']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 计算出区域的必要信息
__pkg__scope_bundle__.calcRegionInfo=function(target1, target2) {

    var region = {

        // 区域的边界信息
        info: {},

        // 区域范围内的所有结点，第一个结点一定是左上角的那个
        nodes: []
    };

    // 先计算出行边界

    var row1_min = target1.row;
    var row1_max = target1.row + target1.rowNum - 1;

    var row2_min = target2.row;
    var row2_max = target2.row + target2.rowNum - 1;

    var row_min = row1_min > row2_min ? row2_min : row1_min;
    var row_max = row1_max > row2_max ? row1_max : row2_max;

    // 再计算出列边界

    var col1_min = target1.col;
    var col1_max = target1.col + target1.colNum - 1;

    var col2_min = target2.col;
    var col2_max = target2.col + target2.colNum - 1;

    var col_min = col1_min > col2_min ? col2_min : col1_min;
    var col_max = col1_max > col2_max ? col1_max : col2_max;

    // 然后就可以标记区域的边界了

    region.info = {
        row: [row_min, row_max],
        col: [col_min, col_max]
    };

    // 最后我们需要计算出此区域里面所有的结点

    var trs = this.__contentDom[this.__tableIndex].getElementsByTagName('tr');
    for (var i = row_min; i <= row_max; i++) {
        var ths = trs[i].getElementsByTagName('th');
        for (var j = 1; j < ths.length; j++) {

            var colValue = ths[j].getAttribute('col');

            if (colValue >= col_min && colValue <= col_max) {
                region.nodes.push(ths[j]);
            } else {

                // 判断是否可以提前结束
                if (colValue > col_max) {
                    break;
                }

            }

        }
    }

    return region;
};

// 在页面中标记当前选择的区域
__pkg__scope_bundle__.showRegion=function() {

    for (var i = 0; i < this.__region.nodes.length; i++) {
        this.__region.nodes[i].style.background = '#e5e0e0';
    }

};

// 取消在页面中标记的区域效果
__pkg__scope_bundle__.cancelRegion=function() {

    for (var i = 0; i < this.__region.nodes.length; i++) {
        this.__region.nodes[i].style.background = this.__contentArray[this.__tableIndex].content[this.__region.nodes[i].getAttribute('row') - 1][this.__region.nodes[i].getAttribute('col') - 1].style.background;
    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/Keyboard
/*****************************************************************/
window.__pkg__bundleSrc__['232']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 键盘总控

__pkg__scope_args__=window.__pkg__getBundle('160');
var getKeyString=__pkg__scope_args__.getKeyString;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function () {
    var _this = this;

    if ('__keyLog' in this) {
        console.error('Keyboard has been initialized');
        return;
    } else {

        this.__keyLog = {
            'shift': false
        };

        bind(document.body, 'keydown', function (event) {
            var keyString = getKeyString(event);

            // 标记shift按下
            if (keyString == 'shift') _this.__keyLog.shift = true;
        });

        bind(document.body, 'keyup', function (event) {
            var keyString = getKeyString(event);

            // 标记shift放开
            if (keyString == 'shift') _this.__keyLog.shift = false;
        });

    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/keyCode
/*****************************************************************/
window.__pkg__bundleSrc__['160']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 字典表
var dictionary = {

    // 数字
    48: [0, ')'],
    49: [1, '!'],
    50: [2, '@'],
    51: [3, '#'],
    52: [4, '$'],
    53: [5, '%'],
    54: [6, '^'],
    55: [7, '&'],
    56: [8, '*'],
    57: [9, '('],
    96: [0, 0],
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",

    // 字母
    65: ["a", "A"],
    66: ["b", "B"],
    67: ["c", "C"],
    68: ["d", "D"],
    69: ["e", "E"],
    70: ["f", "F"],
    71: ["g", "G"],
    72: ["h", "H"],
    73: ["i", "I"],
    74: ["j", "J"],
    75: ["k", "K"],
    76: ["l", "L"],
    77: ["m", "M"],
    78: ["n", "N"],
    79: ["o", "O"],
    80: ["p", "P"],
    81: ["q", "Q"],
    82: ["r", "R"],
    83: ["s", "S"],
    84: ["t", "T"],
    85: ["u", "U"],
    86: ["v", "V"],
    87: ["w", "W"],
    88: ["x", "X"],
    89: ["y", "Y"],
    90: ["z", "Z"],

    // 方向
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",

    // 控制键
    16: "shift",
    17: "ctrl",
    18: "alt",
    91: "command",
    92: "command",
    93: "command",
    224: "command",
    9: "tab",
    20: "caps lock",
    32: "spacebar",
    8: "backspace",
    13: "enter",
    27: "esc",
    46: "delete",
    45: "insert",
    144: "number lock",
    145: "scroll lock",
    12: "clear",
    19: "pause",

    // 功能键
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",

    // 余下键
    189: ["-", "_"],
    187: ["=", "+"],
    219: ["[", "{"],
    221: ["]", "}"],
    220: ["\\", "|"],
    186: [";", ":"],
    222: ["'", '"'],
    188: [",", "<"],
    190: [".", ">"],
    191: ["/", "?"],
    192: ["`", "~"]

};

// 非独立键字典
var help_key = ["shift", "ctrl", "alt"];

// 返回键盘此时按下的键的组合结果
var keyCode = function (event) {
    event = event || window.event;

    var keycode = event.keyCode || event.which;
    var key = dictionary[keycode] || keycode;
    if (!key) return;
    if (key.constructor !== Array) key = [key, key];

    var _key = key[0];

    var shift = event.shiftKey ? "shift+" : "",
        alt = event.altKey ? "alt+" : "",
        ctrl = event.ctrlKey ? "ctrl+" : "";

    var resultKey = "",
        preKey = ctrl + shift + alt;

    if (help_key.indexOf(key[0]) >= 0) {
        key[0] = key[1] = "";
    }

    // 判断是否按下了caps lock
    var lockPress = event.code == "Key" + event.key && !shift;

    // 只有字母（且没有按下功能Ctrl、shift或alt）区分大小写
    resultKey = (preKey + ((preKey == '' && lockPress) ? key[1] : key[0]));

    if (key[0] == "") {
        resultKey = resultKey.replace(/\+$/, '');
    }

    return resultKey == '' ? _key : resultKey;
};

__pkg__scope_bundle__.getKeyString = keyCode;

/**
 * 获取键盘此时按下的键的组合结果
 * @param {Function} callback 回调，键盘有键被按下的时候触发
 * @return {Function} 返回一个函数，执行此函数可以取消键盘监听
 * @examples
 *  keyCode(function (data) {
 *      console.log(data);
 *  });
 */
__pkg__scope_bundle__.default= function (callback) {

    // 记录MacOS的command是否被按下
    var macCommand = false;

    var doKeydown = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = true;

        if (macCommand && !/command/.test(keyStringCode) && !/ctrl/.test(keyStringCode)) keyStringCode = "ctrl+" + keyStringCode;
        callback(keyStringCode.replace(/command/g, 'ctrl').replace('ctrl+ctrl', 'ctrl'), event);
    };

    var doKeyup = function (event) {
        var keyStringCode = keyCode(event);
        if (/command/.test(keyStringCode)) macCommand = false;
    };

    // 在body上注册
    document.body.addEventListener('keydown', doKeydown, false);
    document.body.addEventListener('keyup', doKeyup, false);

    // 返回取消监听函数
    return function () {
        document.body.removeEventListener('keydown', doKeydown, false);
        document.body.removeEventListener('keyup', doKeyup, false);
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/menu/index
/*****************************************************************/
window.__pkg__bundleSrc__['233']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('222');
var find =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('47');
var appendTo =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('224');
var hasClass =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('234');
var colorTemplate =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('225');
var getTargetNode=__pkg__scope_args__.getTargetNode;


__pkg__scope_bundle__.default= function () {
    var _this = this;

    // 顶部操作栏
    var topDom = appendTo(this.__el, "<div class='top-dom' excel></div>");

    this.$$addStyle('top-dom', "" +

        ".top-dom{" +
        "    width: 100%;" +
        "    height: 62px;" +
        "    overflow: hidden;" +
        "}");

    // 菜单
    this.__menuDom = appendTo(topDom, "<div class='menu' excel>" +
        "<span excel>" +
        "    操作" +
        "    <div excel>" +
        "       <span class='item more' excel>" +
        "            插入" +
        "            <div excel>" +
        "                <span class='item' excel>" +
        "                    <span def-type='insert-up'>向上插入</span>" +
        "                    <input value='1' excel />" +
        "                    <span def-type='insert-up'>行</span>" +
        "                </span>" +
        "                <span class='item' excel>" +
        "                    <span def-type='insert-down'>向下插入</span>" +
        "                    <input value='1' excel />" +
        "                    <span def-type='insert-down'>行</span>" +
        "                </span>" +
        "                <span class='item' excel>" +
        "                    <span def-type='insert-left'>向左插入</span>" +
        "                    <input value='1' excel />" +
        "                    <span def-type='insert-left'>列</span>" +
        "                </span>" +
        "                <span class='item' excel>" +
        "                    <span def-type='insert-right'>向右插入</span>" +
        "                    <input value='1' excel />" +
        "                    <span def-type='insert-right'>列</span>" +
        "                </span>" +
        "            </div>" +
        "        </span>" +
        "        <span class='item more' excel>" +
        "            删除" +
        "            <div excel>" +
        "                <span class='item' excel def-type='delete-row'>" +
        "                    删除当前行" +
        "                </span>" +
        "                <span class='item' excel def-type='delete-col'>" +
        "                    删除当前列" +
        "                </span>" +
        "            </div>" +
        "        </span>" +
        "        <span class='item more' excel>" +
        "            合并单元格" +
        "            <div excel>" +
        "                <span class='item' def-type='merge-all' excel>全部合并</span>" +
        "                <span class='item' def-type='merge-cancel' excel>取消合并</span>" +
        "            </div>" +
        "        </span>" +
        "    </div>" +
        "</span>" +
        "<span excel>" +
        "    格式" +
        "    <div excel>" +
        "        <span class='item' def-type='bold' excel>粗体</span>" +
        "        <span class='item' def-type='italic' excel>斜体</span>" +
        "        <span class='item' def-type='underline' excel>下划线</span>" +
        "        <span class='item' def-type='line-through' excel>中划线</span>" +
        "        <span class='line' excel></span>" +
        "        <span class='item more' excel>" +
        "            水平对齐" +
        "            <div excel>" +
        "                <span class='item' def-type='horizontal-left' excel>左对齐</span>" +
        "                <span class='item' def-type='horizontal-center' excel>居中对齐</span>" +
        "                <span class='item' def-type='horizontal-right' excel>右对齐</span>" +
        "            </div>" +
        "        </span>" +
        "        <span class='item more' excel>" +
        "            垂直对齐" +
        "            <div excel>" +
        "                <span class='item' def-type='vertical-top' excel>顶部对齐</span>" +
        "                <span class='item' def-type='vertical-middle' excel>居中对齐</span>" +
        "                <span class='item' def-type='vertical-bottom' excel>底部对齐</span>" +
        "            </div>" +
        "        </span>" +
        "    </div>" +
        "</span>" +
        "</div>");

    this.$$addStyle('menu', "" +

        ".menu{" +
        "    border-bottom: 1px solid #d6cccb;" +
        "    padding: 0 20px;" +
        "    box-sizing: border-box;" +
        "    white-space: nowrap;" +
        "}" +

        ".menu>span{" +
        "    display: inline-block;" +
        "    line-height: 26px;" +
        "    padding: 0 10px;" +
        "    font-size: 12px;" +
        "    cursor: pointer;" +
        "    color: #555555;" +
        "}" +

        ".menu>span:hover{" +
        "    background: white;" +
        "}" +

        ".menu>span>div{" +
        "    margin-left: -10px;" +
        "}" +

        ".menu>span div{" +
        "    position:absolute;" +
        "    background: white;" +
        "    width: 140px;" +
        "    box-shadow: 4px 3px 6px 0 #c9c9e2;" +
        "    display:none;" +
        "    padding:5px 0;" +
        "}" +

        ".menu>span div span{" +
        "    display:block;" +
        "    position:relative;" +
        "    padding:5px 20px;" +
        "}" +

        ".menu>span div span>div{" +
        "    left:140px;" +
        "    top:0px;" +
        "}" +

        ".menu .line{" +
        "    height:1px;" +
        "    background-color:#d6cccb;" +
        "    padding:0;" +
        "    margin:0 10px;" +
        "}" +

        ".menu input{" +
        "    width:20px;" +
        "    outline:none;" +
        "}" +

        ".menu span:hover>div{" +
        "    display:block;" +
        "}" +

        ".menu span.more:after{" +
        '    content:" > ";' +
        "    position: absolute;" +
        "    right: 12px;" +
        "    font-weight: 800;" +
        "}" +

        ".menu a{" +
        "    text-decoration: none;" +
        "    color: #555555;" +
        "}" +

        ".menu input{" +
        "    width:20px;" +
        "    outline:none;" +
        "}" +

        ".menu .item.active::before{" +
        '    content: " * ";' +
        "    color: red;" +
        "    position: absolute;" +
        "    left: 8px;" +
        "}" +

        ".menu .item{" +
        "    text-decoration: none;" +
        "}" +

        ".menu .item:hover{" +
        "    text-decoration: underline;" +
        "}");

    // 快捷菜单
    this.__menuQuickDom = appendTo(topDom, "<div class='quick-menu' excel>" +
        "<span class='item' def-type='format' excel>格式刷</span>" +
        "<span class='line' excel></span>" +
        "<span class='item color' def-type='font-color' excel>" +
        "    文字颜色：<i class='color' excel></i>" +
        colorTemplate +
        "</span>" +
        "<span class='item color' def-type='background-color' excel>" +
        "    填充色：<i class='color' excel></i>" +
        colorTemplate +
        "</span>" +
        "<span class='line' excel></span>" +
        "<span class='item' def-type='merge-all' excel>" +
        "    全部合并" +
        "</span>" +
        "<span class='item' def-type='merge-cancel' excel>" +
        "    取消合并" +
        "</span>" +
        "<span class='line' excel></span>" +
        "<span class='item' def-type='horizontal-left' excel>" +
        "    左对齐" +
        "</span>" +
        "<span class='item' def-type='horizontal-center' excel>" +
        "    居中对齐" +
        "</span>" +
        "<span class='item' def-type='horizontal-right' excel>" +
        "    右对齐" +
        "</span>" +
        "<span class='line' excel></span>" +
        "<span class='item' def-type='vertical-top' excel>" +
        "    顶部对齐" +
        "</span>" +
        "<span class='item' def-type='vertical-middle' excel>" +
        "    居中对齐" +
        "</span>" +
        "<span class='item' def-type='vertical-bottom' excel>" +
        "    底部对齐" +
        "</span>" +
        "</div>");

    this.$$addStyle('quick-menu', "" +

        ".quick-menu{" +
        "    line-height: 36px;" +
        "    font-size: 12px;" +
        "    white-space: nowrap;" +
        "    width: 100%;" +
        "    overflow: auto;" +
        "}" +

        ".quick-menu span{" +
        "    display:inline-block;" +
        "    vertical-align: top;" +
        "}" +

        ".quick-menu span>i.color{" +
        "    display: inline-block;" +
        "    height: 14px;" +
        "    width: 20px;" +
        "    border:1px solid #d6cccb;" +
        "    vertical-align: middle;" +
        "}" +

        ".quick-menu .item{" +
        "    margin:0 10px;" +
        "    cursor: pointer;" +
        "}" +

        ".quick-menu .line{" +
        "    background-color:#d6cccb;" +
        "    width:1px;" +
        "    height:22px;" +
        "    margin-top:7px;" +
        "}" +

        ".quick-menu .item:hover{" +
        "    font-weight: 800;" +
        "}" +

        ".quick-menu .item.active{" +
        "    font-weight: 800;" +
        "    color: red;" +
        "}" +

        "/* 选择颜色 */" +

        ".color-view{" +
        "    font-size: 0px;" +
        "    width: 171px;" +
        "    position: absolute;" +
        "    padding: 10px;" +
        "    box-sizing: content-box;" +
        "    background: #fefefe;" +
        "    box-shadow: 1px 1px 5px #9e9695;" +
        "    line-height:1em;" +
        "    display:none;" +
        "    margin-top: -5px;" +
        "    white-space: normal;" +
        "}" +

        ".color:hover>.color-view, .color-view:hover{" +
        "    display:block;" +
        "}" +

        ".color-item{" +
        "    display: inline-block;" +
        "    width: 19px;" +
        "    height: 19px;" +
        "}" +

        ".color-item>span{" +
        "    width: 15px;" +
        "    height: 15px;" +
        "    margin: 2px;" +
        "    cursor: pointer;" +
        "    box-sizing: border-box;" +
        "}" +

        ".color-item>span:hover{" +
        "    outline:1px solid black;" +
        "}");

    // 对菜单添加点击事件
    var menuClickItems = find(topDom, function (node) { return node.getAttribute('def-type'); }, 'span');

    bind(menuClickItems, 'click', function (event) {

        var node = getTargetNode(event);

        // 获取按钮类型
        var defType = node.getAttribute('def-type');

        _this.$$menuHandler(defType, node);

    });

    // 对选择颜色添加点击事件
    var colorItems = find(topDom, function (node) { return hasClass(node, 'color'); }, 'span');
    for (var i = 0; i < colorItems.length; i++) {

        var colorClickItems = find(colorItems[i], function () { return true; }, 'span');
        (function (i) {
            bind(colorClickItems, 'click', function (event) {

                var defType = colorItems[i].getAttribute('def-type');
                var colorValue = getTargetNode(event).style.background;

                // 设置
                _this.$$setItemStyle({
                    'background-color': 'background',
                    'font-color': 'color'
                }[defType], colorValue);

            });
        })(i);

    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/menu/color-template
/*****************************************************************/
window.__pkg__bundleSrc__['234']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var colors = [
    ['白', 'rgb(255, 255, 255)'],
    ['漆黑', 'rgb(13, 0, 21)'],
    ['红', 'rgb(254, 44, 35)'],
    ['橙', 'rgb(255, 153, 0)'],
    ['黄', 'rgb(255, 217, 0)'],
    ['葱绿', 'rgb(163, 224, 67)'],
    ['湖蓝', 'rgb(55, 217, 240)'],
    ['天色', 'rgb(77, 168, 238)'],
    ['藤紫', 'rgb(149, 111, 231)'],
    ['白练', 'rgb(243, 243, 244)'],
    ['白鼠', 'rgb(204, 204, 204)'],
    ['樱', 'rgb(254, 242, 240)'],
    ['镐', 'rgb(254, 245, 231)'],
    ['练', 'rgb(254, 252, 217)'],
    ['芽', 'rgb(237, 246, 232)'],
    ['水', 'rgb(230, 250, 250)'],
    ['缥', 'rgb(235, 244, 252)'],
    ['丁香', 'rgb(240, 237, 246)'],
    ['灰青', 'rgb(215, 216, 217)'],
    ['鼠', 'rgb(165, 165, 165)'],
    ['虹', 'rgb(251, 212, 208)'],
    ['落柿', 'rgb(255, 215, 185)'],
    ['花叶', 'rgb(249, 237, 166)'],
    ['白绿', 'rgb(212, 233, 214)'],
    ['天青', 'rgb(199, 230, 234)'],
    ['天空', 'rgb(204, 224, 241)'],
    ['水晶', 'rgb(218, 213, 233)'],
    ['薄纯', 'rgb(123, 127, 131)'],
    ['墨', 'rgb(73, 73, 73)'],
    ['甚三红', 'rgb(238, 121, 118)'],
    ['珊瑚', 'rgb(250, 165, 115)'],
    ['金', 'rgb(230, 179, 34)'],
    ['薄青', 'rgb(152, 192, 145)'],
    ['白群', 'rgb(121, 198, 205)'],
    ['薄花', 'rgb(110, 170, 215)'],
    ['紫苑', 'rgb(156, 142, 193)'],
    ['石墨', 'rgb(65, 70, 75)'],
    ['黑', 'rgb(51, 51, 51)'],
    ['绯红', 'rgb(190, 26, 29)'],
    ['棕黄', 'rgb(185, 85, 20)'],
    ['土黄', 'rgb(173, 114, 14)'],
    ['苍翠', 'rgb(28, 114, 49)'],
    ['孔雀', 'rgb(28, 120, 146)'],
    ['琉璃', 'rgb(25, 67, 156)'],
    ['青莲', 'rgb(81, 27, 120)']
];

var template = "<div class='color-view' excel>";
for (var i = 0; i < colors.length; i++) {
    template += "<div class='color-item' excel><span title='" + colors[i][0] + "' excel style='background:" + colors[i][1] + "'> </span></div>";
}
template += "</div>";

__pkg__scope_bundle__.default= template;


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/menu/update
/*****************************************************************/
window.__pkg__bundleSrc__['235']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('222');
var find =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('236');
var addClass =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('223');
var removeClass =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (style) {

    // 更新顶部菜单

    var menuItems = find(this.__menuDom, function (node) { return node.getAttribute('def-type'); }, 'span');
    for (var i = 0; i < menuItems.length; i++) {

        // 获取按钮类型
        var defType = menuItems[i].getAttribute('def-type');

        // 粗体
        if (defType == 'bold') {

            if (style['font-weight'] == 'bold') {
                addClass(menuItems[i], 'active');
            } else {
                removeClass(menuItems[i], 'active');
            }

        }

        // 粗体
        else if (defType == 'italic') {

            if (style['font-style'] == 'italic') {
                addClass(menuItems[i], 'active');
            } else {
                removeClass(menuItems[i], 'active');
            }

        }

        // 中划线
        else if (defType == 'underline') {

            if (style['text-decoration'] == 'underline') {
                addClass(menuItems[i], 'active');
            } else {
                removeClass(menuItems[i], 'active');
            }

        }

        // 下划线
        else if (defType == 'line-through') {

            if (style['text-decoration'] == 'line-through') {
                addClass(menuItems[i], 'active');
            } else {
                removeClass(menuItems[i], 'active');
            }

        }

        // 水平对齐方式
        else if (/^horizontal\-/.test(defType)) {

            if (defType == 'horizontal-' + style['text-align']) {
                addClass(menuItems[i], 'active');
            } else {
                removeClass(menuItems[i], 'active');
            }

        }

        // 垂直对齐方式
        else if (/^vertical\-/.test(defType)) {

            if (defType == 'vertical-' + style['vertical-align']) {
                addClass(menuItems[i], 'active');
            } else {
                removeClass(menuItems[i], 'active');
            }

        }

    }

    // 更新快速使用菜单

    var quickItems = find(this.__menuQuickDom, function (node) { return node.getAttribute('def-type'); }, 'span');
    for (var i = 0; i < quickItems.length; i++) {

        // 获取按钮类型
        var defType = quickItems[i].getAttribute('def-type');

        // 文字颜色
        if (defType == 'font-color') {
            quickItems[i].getElementsByTagName('i')[0].style.backgroundColor = style.color;
        }

        // 填充色
        else if (defType == 'background-color') {
            quickItems[i].getElementsByTagName('i')[0].style.backgroundColor = style.background;
        }

        // 水平对齐方式
        else if (/^horizontal\-/.test(defType)) {

            if (defType == 'horizontal-' + style['text-align']) {
                addClass(quickItems[i], 'active');
            } else {
                removeClass(quickItems[i], 'active');
            }

        }

        // 垂直对齐方式
        else if (/^vertical\-/.test(defType)) {

            if (defType == 'vertical-' + style['vertical-align']) {
                addClass(quickItems[i], 'active');
            } else {
                removeClass(quickItems[i], 'active');
            }

        }

    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/addClass
/*****************************************************************/
window.__pkg__bundleSrc__['236']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('224');
var hasClass =__pkg__scope_args__.default;


// 添加指定class
__pkg__scope_bundle__.default= function (dom, clazz) {
    if (hasClass(dom, clazz)) return;
    var oldClazz = dom.getAttribute('class') || "";
    dom.setAttribute('class', oldClazz + " " + clazz);
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/menu/menu-handler
/*****************************************************************/
window.__pkg__bundleSrc__['237']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('224');
var hasClass =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('222');
var find =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('236');
var addClass =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (defType, node) {

    // 格式刷
    if (defType == 'format') {

        // 首先需要确定选择区域，然后点击格式刷来同步格式
        if (this.__region != null) {

            // 标记格式刷
            this.__format = true;
            addClass(find(this.__menuQuickDom, function (node) { return node.getAttribute('def-type') == 'format'; }, 'span')[0], 'active');

        }

    }

    // 粗体
    else if (defType == 'bold') {
        this.$$setItemStyle('font-weight', hasClass(node, 'active') ? 'normal' : 'bold');
    }

    // 斜体
    else if (defType == 'italic') {
        this.$$setItemStyle('font-style', hasClass(node, 'active') ? 'normal' : 'italic');
    }

    // 中划线
    else if (defType == 'line-through') {
        this.$$setItemStyle('text-decoration', hasClass(node, 'active') ? 'none' : 'line-through');
    }

    // 下划线
    else if (defType == 'underline') {
        this.$$setItemStyle('text-decoration', hasClass(node, 'active') ? 'none' : 'underline');
    }

    // 水平对齐方式
    else if (/^horizontal\-/.test(defType)) {
        this.$$setItemStyle('text-align', defType.replace('horizontal-', ''));
    }

    // 垂直对齐方式
    else if (/^vertical\-/.test(defType)) {
        this.$$setItemStyle('vertical-align', defType.replace('vertical-', ''));
    }

    // 合并单元格
    else if (/^merge\-/.test(defType)) {

        // 无选择区域，直接结束
        if (this.__region == null) return;

        // 全部合并
        if (defType == 'merge-all') {

            // 如果选择的区域就一个结点，不用额外的操作了
            if (this.__region.nodes.length <= 1) return;

            // 删除多余的结点并修改数据
            for (var i = 1; i < this.__region.nodes.length; i++) {

                this.__contentArray[this.__tableIndex].content[this.__region.nodes[i].getAttribute('row') - 1][this.__region.nodes[i].getAttribute('col') - 1].style.display = 'none';
                this.__contentArray[this.__tableIndex].content[this.__region.nodes[i].getAttribute('row') - 1][this.__region.nodes[i].getAttribute('col') - 1].value = ' ';
                this.__region.nodes[i].style.display = 'none';
            }

            this.__region.nodes = [this.__region.nodes[0]];

            // 修改第一个结点的数据和占位

            this.__contentArray[this.__tableIndex].content[this.__region.nodes[0].getAttribute('row') - 1][this.__region.nodes[0].getAttribute('col') - 1].colspan = (this.__region.info.col[1] - this.__region.info.col[0] + 1) + "";
            this.__contentArray[this.__tableIndex].content[this.__region.nodes[0].getAttribute('row') - 1][this.__region.nodes[0].getAttribute('col') - 1].rowspan = (this.__region.info.row[1] - this.__region.info.row[0] + 1) + "";

            this.__region.nodes[0].setAttribute('colspan', (this.__region.info.col[1] - this.__region.info.col[0] + 1) + "");
            this.__region.nodes[0].setAttribute('rowspan', (this.__region.info.row[1] - this.__region.info.row[0] + 1) + "");

            this.__region.nodes[0].click();
        }

        // 取消合并
        else if (defType == 'merge-cancel') {

            var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

            // 确保所有的格子都是 1*1 的
            for (var row = this.__region.info.row[0]; row <= this.__region.info.row[1]; row++) {

                var colNodes = find(rowNodes[row], function () { return true; }, 'th');

                for (var col = this.__region.info.col[0]; col <= this.__region.info.col[1]; col++) {

                    // 修改界面显示
                    colNodes[col].style.display = 'table-cell';
                    colNodes[col].setAttribute('colspan', '1');
                    colNodes[col].setAttribute('rowspan', '1');

                    // 修改数据
                    this.__contentArray[this.__tableIndex].content[row - 1][col - 1].style.display = 'table-cell';
                    this.__contentArray[this.__tableIndex].content[row - 1][col - 1].colspan = '1';
                    this.__contentArray[this.__tableIndex].content[row - 1][col - 1].rowspan = '1';

                }

            }

            this.$$cancelRegion();
            this.__region = null;

        }

    }

    // 插入
    else if (/^insert\-/.test(defType)) {

        var num = +find(node.parentNode, function () { return true; }, 'input')[0].value;

        // 向上插入行
        if (defType == 'insert-up') {
            for (var i = 0; i < num; i++) this.$$insertUpNewRow();
        }

        // 向下插入行
        else if (defType == 'insert-down') {
            for (var i = 0; i < num; i++) this.$$insertDownNewRow();
        }

        // 向左插入列
        else if (defType == 'insert-left') {
            for (var i = 0; i < num; i++) this.$$insertLeftNewCol();
        }

        // 向右插入列
        else if (defType == 'insert-right') {
            for (var i = 0; i < num; i++) this.$$insertRightNewCol();
        }

    }

    // 删除
    else if (/^delete\-/.test(defType)) {

        // 删除当前行
        if (defType == 'delete-row') {
            this.$$deleteCurrentRow();
        }

        // 删除当前列
        else if (defType == 'delete-col') {
            this.$$deleteCurrentCol();
        }

    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/menu/insert
/*****************************************************************/
window.__pkg__bundleSrc__['238']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('222');
var find =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('239');
var before =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('47');
var appendTo =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('175');
var after =__pkg__scope_args__.default;


__pkg__scope_bundle__.insertUp=function() {
    var _this = this;

    var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

    // 首先，直接在插入行前面插入一行
    var newRowNode = before(rowNodes[this.__rowNum], '<tr><th class="line-num" excel>' + (this.__rowNum) + '</th></tr>');

    rowNodes.splice(this.__rowNum, 0, newRowNode);
    this.__contentArray[this.__tableIndex].content.splice(this.__rowNum - 1, 0, []);

    // 然后，校对数据
    for (var row = this.__rowNum + 1; row <= rowNodes.length - 1; row++) {
        var colNodes = find(rowNodes[row], function () { return true; }, 'th');

        // 修改行数
        colNodes[0].innerText = row;

        // 依次修改记录的行数
        for (var col = 1; col < colNodes.length; col++) {
            colNodes[col].setAttribute('row', row);
        }
    }

    for (var col = 1; col <= this.__contentArray[this.__tableIndex].content[this.__rowNum == 1 ? 1 : 0].length; col++) {

        // 获取新的数据
        var tempNewItemData = this.$$newItemData();

        /**
         * 嗅探当前单元格情况，
         * 由于会出现合并单元格情况，所以需要对一些特殊情况，进行特殊校对
         */

        var currentItemData = this.__contentArray[this.__tableIndex].content[this.__rowNum][col - 1];

        //  如果不是第一行，而且自己不可见
        if (this.__rowNum != 1 && currentItemData.style.display == 'none') {

            // 那么，我们现在需要确定我们当前行是否位于合并单元格的顶部
            // 因为，如果自己位于顶部，即使不可见，依旧应该可以向上新增一行而不是增高自己

            // 如何知道自己是不是顶部？
            // 我们可以不停的嗅探左边第一个显示的单元格，如果他可以囊括自己，那自己应该就是上顶部
            // 否则就是非第一行

            var isFirstLine = false;
            for (var toLeftCol = col - 1; toLeftCol >= 1; toLeftCol--) {
                var leftItemData = this.__contentArray[this.__tableIndex].content[this.__rowNum][toLeftCol - 1];
                if (leftItemData.style.display != 'none') {

                    // 如果找到的第一个显示的可以包含当前条目
                    if (toLeftCol - -leftItemData.colspan > col) isFirstLine = true;

                    break;
                }

            }

            // 如果是第一行我们就可以直接放过
            if (!isFirstLine) {

                // 到目前为止，我们可以确定的是，当前新增的条目需要隐藏
                tempNewItemData.style.display = 'none';

                // 判断是不是最左边的
                var isLeftFirst = col == 1 || (function () {
                    var updist = 1;
                    while (true) {

                        // 如果到顶了还没有遇到左上，必须不是最左边
                        if (_this.__rowNum - 1 - updist < 0) return false;

                        // 如果都不显示，继续往上
                        if (_this.__contentArray[_this.__tableIndex].content[_this.__rowNum - 1 - updist][col - 1].style.display == 'none') {
                            updist += 1;
                        } else {

                            // 如果遇到第一个显示的可以包括自己，那自己一定是最左边
                            return _this.__contentArray[_this.__tableIndex].content[_this.__rowNum - 1 - updist][col - 1].rowspan - updist > 0;
                        }
                    }
                })();

                // 如果是最左边的，就需要负责修改左上角格子的值
                if (isLeftFirst) {

                    for (var preRow = this.__rowNum - 1; preRow > 0; preRow--) {

                        // 接着，让我们寻找这个条目合并后单元格的左上角
                        if (this.__contentArray[this.__tableIndex].content[preRow - 1][col - 1].style.display != 'none') {

                            // 数据
                            this.__contentArray[this.__tableIndex].content[preRow - 1][col - 1].rowspan -= -1;

                            // 结点
                            var leftTopNode = find(rowNodes[preRow], function () { return true; }, 'th')[col];
                            leftTopNode.setAttribute('rowspan', leftTopNode.getAttribute('rowspan') - -1);

                            // 找到以后别忘了停止
                            break;
                        }
                    }

                }

            }

        }

        // 追加数据
        this.__contentArray[this.__tableIndex].content[this.__rowNum - 1].push(tempNewItemData);

        // 追加结点
        var newItemNode = appendTo(newRowNode,
            '<th row="' + this.__rowNum + '" col="' + col + '" contenteditable="true" class="item" colspan="1" rowspan="1" style="' + this.$$styleToString(tempNewItemData.style) + '" excel></th>'
        );

        // 绑定事件
        bind(newItemNode, 'mousedown', function (event) {
            setTimeout(function () {
                if (!_this.__isrightmenu) _this.$$itemClickHandler(event);
            });
        });
        bind(newItemNode, 'mousemove', function (event) {
            _this.$$itemMoveHandler(event);
        });
        bind(newItemNode, 'input', function (event) {
            _this.$$itemInputHandler(event);
        });

    }

    // 最后标记下沉
    this.__rowNum += 1;
};

__pkg__scope_bundle__.insertDown=function() {
    var _this = this;

    var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

    // 首先，直接在插入行前面插入一行
    var newRowNode = after(rowNodes[this.__rowNum], '<tr><th class="line-num" excel>' + (this.__rowNum + 1) + '</th></tr>');

    rowNodes.splice(this.__rowNum + 1, 0, newRowNode);
    this.__contentArray[this.__tableIndex].content.splice(this.__rowNum, 0, []);

    // 然后，校对数据
    for (var row = this.__rowNum + 2; row <= rowNodes.length - 1; row++) {
        var colNodes = find(rowNodes[row], function () { return true; }, 'th');

        // 修改行数
        colNodes[0].innerText = row;

        // 依次修改记录的行数
        for (var col = 1; col < colNodes.length; col++) {
            colNodes[col].setAttribute('row', row);
        }
    }

    for (var col = 1; col <= this.__contentArray[this.__tableIndex].content[0].length; col++) {

        // 获取新的数据
        var tempNewItemData = this.$$newItemData();

        /**
         * 对当前单元格合并情况进行嗅探
         */

        //  如果不是最后一行
        if (this.__rowNum != this.__contentArray[this.__tableIndex].content.length - 1) {

            var currentItemData = this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][col - 1];

            // 不可见或行数不为1
            if (currentItemData.style.display == 'none' || currentItemData.rowspan != '1') {

                // 为了可以之前当前插入点的相对位置，我们首先需要找到合并后单元格左上角的数据和位置
                var leftTopData = this.$$getLeftTop(this.__rowNum, col);

                // 如果不是最底部一行
                if (leftTopData.row - -leftTopData.content.rowspan - 1 > this.__rowNum) {

                    // 到此为止，可以确定当前的条目一定隐藏
                    tempNewItemData.style.display = 'none';

                    // 如果是最左边的
                    if (leftTopData.col == col) {

                        // 数据
                        this.__contentArray[this.__tableIndex].content[leftTopData.row - 1][leftTopData.col - 1].rowspan -= -1;

                        // 结点
                        var leftTopNode = find(rowNodes[leftTopData.row], function () { return true; }, 'th')[leftTopData.col];
                        leftTopNode.setAttribute('rowspan', leftTopNode.getAttribute('rowspan') - -1);

                    }

                }
            }
        }

        // 追加数据
        this.__contentArray[this.__tableIndex].content[this.__rowNum].push(tempNewItemData);

        // 追加结点
        var newItemNode = appendTo(newRowNode,
            '<th row="' + this.__rowNum + '" col="' + col + '" contenteditable="true" class="item" colspan="1" rowspan="1" style="' + this.$$styleToString(tempNewItemData.style) + '" excel></th>'
        );

        // 绑定事件
        bind(newItemNode, 'mousedown', function (event) {
            setTimeout(function () {
                if (!_this.__isrightmenu) _this.$$itemClickHandler(event);
            });
        });
        bind(newItemNode, 'mousemove', function (event) {
            _this.$$itemMoveHandler(event);
        });
        bind(newItemNode, 'input', function (event) {
            _this.$$itemInputHandler(event);
        });

    }

};

__pkg__scope_bundle__.insertLeft=function() {
    var _this = this;

    var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

    // 先修改顶部的位置提示
    appendTo(rowNodes[0], "<th class='top-name' excel>" + this.$$calcColName(this.__contentArray[this.__tableIndex].content[0].length) + "</th>");

    for (var row = 1; row < rowNodes.length; row++) {
        var colNodes = find(rowNodes[row], function () { return true; }, 'th');

        // 校对列序号
        for (var col = this.__colNum; col < colNodes.length; col++) {
            colNodes[col].setAttribute('col', col + 1);
        }

        // 获取新的数据
        var tempNewItemData = this.$$newItemData();

        /**
         * 对当前单元格合并情况进行嗅探
         */

        var currentItemData = this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum - 1];

        //  如果不是第一列，而且自己不可见
        if (this.__colNum != 1 && currentItemData.style.display == 'none') {

            var isFirstCol = false;
            for (var toTopRow = row - 1; toTopRow >= 1; toTopRow--) {
                var topItemData = this.__contentArray[this.__tableIndex].content[toTopRow - 1][this.__colNum];
                if (topItemData.style.display != 'none') {

                    // 如果找到的第一个显示的可以包含当前条目
                    if (toTopRow - -topItemData.rowspan > row) isFirstCol = true;

                    break;
                }

            }

            // 如果是第一列我们就可以直接放过
            if (!isFirstCol) {
                tempNewItemData.style.display = 'none';

                // 判断是不是最顶部的
                var isTopFirst = row == 1 || this.__contentArray[this.__tableIndex].content[row - 2][this.__colNum].style.display != 'none';

                // 如果是最坐标的，就需要负责修改左上角格子的值
                if (isTopFirst) {

                    for (var preCol = this.__colNum - 1; preCol > 0; preCol--) {

                        // 接着，让我们寻找这个条目合并后单元格的左上角
                        if (this.__contentArray[this.__tableIndex].content[row - 1][preCol - 1].style.display != 'none') {

                            // 数据
                            this.__contentArray[this.__tableIndex].content[row - 1][preCol - 1].colspan -= -1;

                            // 结点
                            var leftTopNode = find(rowNodes[row], function () { return true; }, 'th')[preCol];
                            leftTopNode.setAttribute('colspan', leftTopNode.getAttribute('colspan') - -1);

                            // 找到以后别忘了停止
                            break;
                        }
                    }

                }

            }

        }

        // 追加数据
        this.__contentArray[this.__tableIndex].content[row - 1].splice(this.__colNum - 1, 0, tempNewItemData);

        // 追加结点
        var newItemNode = before(colNodes[this.__colNum],
            '<th row="' + row + '" col="' + this.__colNum + '" contenteditable="true" class="item" colspan="1" rowspan="1" style="' + this.$$styleToString(tempNewItemData.style) + '" excel></th>'
        );

        // 绑定事件
        bind(newItemNode, 'mousedown', function (event) {
            setTimeout(function () {
                if (!_this.__isrightmenu) _this.$$itemClickHandler(event);
            });
        });
        bind(newItemNode, 'mousemove', function (event) {
            _this.$$itemMoveHandler(event);
        });
        bind(newItemNode, 'input', function (event) {
            _this.$$itemInputHandler(event);
        });

    }

    // 最后标记右移
    this.__colNum += 1;
};

__pkg__scope_bundle__.insertRight=function() {
    var _this = this;

    var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

    // 先修改顶部的位置提示
    appendTo(rowNodes[0], "<th class='top-name' excel>" + this.$$calcColName(this.__contentArray[this.__tableIndex].content[0].length) + "</th>");

    for (var row = 1; row < rowNodes.length; row++) {
        var colNodes = find(rowNodes[row], function () { return true; }, 'th');

        // 校对列序号
        for (var col = this.__colNum + 1; col < colNodes.length; col++) {
            colNodes[col].setAttribute('col', col + 1);
        }

        // 获取新的数据
        var tempNewItemData = this.$$newItemData();

        /**
        * 对当前单元格合并情况进行嗅探
        */

        //  如果不是最后一列
        if (this.__colNum != this.__contentArray[this.__tableIndex].content[0].length - 1) {

            var currentItemData = this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum - 1];

            // 不可见或列数不为1
            if (currentItemData.style.display == 'none' || currentItemData.colspan != '1') {

                // 为了可以获取当前插入点的相对位置，我们首先需要找到合并后单元格左上角的数据和位置
                var leftTopData = this.$$getLeftTop(row, this.__colNum);

                // 如果不是最右边一列
                if (leftTopData.col - -leftTopData.content.colspan - 1 > this.__colNum) {

                    // 到此为止，可以确定当前的条目一定隐藏
                    tempNewItemData.style.display = 'none';

                    // 如果是最顶部的
                    if (leftTopData.row == row) {

                        // 数据
                        this.__contentArray[this.__tableIndex].content[leftTopData.row - 1][leftTopData.col - 1].colspan -= -1;

                        // 结点
                        var leftTopNode = find(rowNodes[leftTopData.row], function () { return true; }, 'th')[leftTopData.col];
                        leftTopNode.setAttribute('colspan', leftTopNode.getAttribute('colspan') - -1);

                    }

                }
            }

        }

        // 追加数据
        this.__contentArray[this.__tableIndex].content[row - 1].splice(this.__colNum, 0, tempNewItemData);

        // 追加结点
        var newItemNode = after(colNodes[this.__colNum],
            '<th row="' + row + '" col="' + (this.__colNum + 1) + '" contenteditable="true" class="item" colspan="1" rowspan="1" style="' + this.$$styleToString(tempNewItemData.style) + '" excel></th>'
        );

        // 绑定事件
        bind(newItemNode, 'mousedown', function (event) {
            setTimeout(function () {
                if (!_this.__isrightmenu) _this.$$itemClickHandler(event);
            });
        });
        bind(newItemNode, 'mousemove', function (event) {
            _this.$$itemMoveHandler(event);
        });
        bind(newItemNode, 'input', function (event) {
            _this.$$itemInputHandler(event);
        });
    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/before
/*****************************************************************/
window.__pkg__bundleSrc__['239']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('48');
var isElement =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('49');
var toNode =__pkg__scope_args__.default;


// 在被选元素之前插入内容
__pkg__scope_bundle__.default= function (el, template) {
    var node = isElement(template) ? template : toNode(template);
    el.parentNode.insertBefore(node, el);
    return node;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/after
/*****************************************************************/
window.__pkg__bundleSrc__['175']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('48');
var isElement =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('49');
var toNode =__pkg__scope_args__.default;


// 在被指定元素之后插入节点
__pkg__scope_bundle__.default= function (el, template) {
    var node = isElement(template) ? template : toNode(template);
    el.parentNode.insertBefore(node, el.nextSibling);
    return node;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/menu/delete
/*****************************************************************/
window.__pkg__bundleSrc__['240']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('222');
var find =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('33');
var remove =__pkg__scope_args__.default;


__pkg__scope_bundle__.deleteRow=function() {

    var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

    // 校对行号
    for (var row = this.__rowNum + 1; row <= this.__contentArray[this.__tableIndex].content.length; row++) {
        var colNodes = find(rowNodes[row], function () { return true; }, 'th');

        // 修改行数
        colNodes[0].innerText = row - 1;

        // 依次修改记录的行数
        for (var col = 1; col < colNodes.length; col++) {
            colNodes[col].setAttribute('row', row - 1);
        }

    }

    var isLastLine = this.__rowNum == this.__contentArray[this.__tableIndex].content.length;// 是否是最后一行

    var downColNodes;
    if (!isLastLine) downColNodes = find(rowNodes[this.__rowNum + 1], function () { return true; }, 'th');

    // 校对colspan
    for (var col = 1; col <= this.__contentArray[this.__tableIndex].content[0].length; col++) {

        // 如果当前条目隐藏
        if (this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][col - 1].style.display == 'none') {

            // 隐藏的话，就只需要考虑位于左上角的正下方情况
            for (var preRow = this.__rowNum - 1; preRow >= 1; preRow--) {
                if (this.__contentArray[this.__tableIndex].content[preRow - 1][col - 1].style.display != 'none') {

                    // 如果是左上角
                    if (preRow - -this.__contentArray[this.__tableIndex].content[preRow - 1][col - 1].rowspan > this.__rowNum) {

                        var newRowspan = this.__contentArray[this.__tableIndex].content[preRow - 1][col - 1].rowspan - 1;

                        // 结点
                        find(rowNodes[preRow], function () { return true; }, 'th')[col].setAttribute('rowspan', newRowspan);

                        // 数据
                        this.__contentArray[this.__tableIndex].content[preRow - 1][col - 1].rowspan = newRowspan;

                    }

                    break;
                }

            }

        }

        // 如果没有隐藏，可是是左上角
        // (如果是一行肯定可以直接无视)
        else if (this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][col - 1].rowspan - 1 > 0) {

            var newRowspan = this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][col - 1].rowspan - 1;
            var colspan = this.__contentArray[this.__tableIndex].content[this.__rowNum - 1][col - 1].colspan;

            // 结点
            downColNodes[col].setAttribute('rowspan', newRowspan);
            downColNodes[col].setAttribute('colspan', colspan);
            downColNodes[col].style.display = 'table-cell';

            // 数据
            this.__contentArray[this.__tableIndex].content[this.__rowNum][col - 1].rowspan = newRowspan;
            this.__contentArray[this.__tableIndex].content[this.__rowNum][col - 1].colspan = colspan;
            this.__contentArray[this.__tableIndex].content[this.__rowNum][col - 1].style.display = 'table-cell';

        }

    }

    // 删除当前行
    remove(rowNodes[this.__rowNum]);

    // 删除数据
    this.__contentArray[this.__tableIndex].content.splice(this.__rowNum - 1, 1);

    // 重置光标
    this.__btnDom[this.__tableIndex].click();
};

__pkg__scope_bundle__.deleteCol=function() {

    var rowNodes = find(this.__contentDom[this.__tableIndex], function () { return true; }, 'tr');

    // 校对rowspan
    for (var row = 1; row <= this.__contentArray[this.__tableIndex].content.length; row++) {

        // 如果当前条目隐藏
        if (this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum - 1].style.display == 'none') {

            for (var preCol = this.__colNum - 1; preCol >= 1; preCol--) {

                if (this.__contentArray[this.__tableIndex].content[row - 1][preCol - 1].style.display != 'none') {

                    // 如果是左上角
                    if (preCol - -this.__contentArray[this.__tableIndex].content[row - 1][preCol - 1].colspan > this.__colNum) {

                        var newColspan = this.__contentArray[this.__tableIndex].content[row - 1][preCol - 1].colspan - 1;

                        // 结点
                        find(rowNodes[row], function () { return true; }, 'th')[preCol].setAttribute('colspan', newColspan);

                        // 数据
                        this.__contentArray[this.__tableIndex].content[row - 1][preCol - 1].colspan = newColspan;

                    }

                    break;
                }

            }

        }

        //  左上角
        else if (this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum - 1].colspan - 1 > 0) {

            var nextColNode = find(rowNodes[row], function () { return true; }, 'th')[this.__colNum + 1];
            var newColspan = this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum - 1].colspan - 1;
            var rowspan = this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum - 1].rowspan;

            // 结点
            nextColNode.setAttribute('colspan', newColspan);
            nextColNode.setAttribute('rowspan', rowspan);
            nextColNode.style.display = 'table-cell';

            // 数据
            this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum].colspan = newColspan;
            this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum].rowspan = rowspan;
            this.__contentArray[this.__tableIndex].content[row - 1][this.__colNum].style.display = 'table-cell';

        }

    }

    // 先删除列标题
    find(rowNodes[0], function () { return true; }, 'th')[this.__contentArray[this.__tableIndex].content[0].length].remove();

    for (var row = 1; row < rowNodes.length; row++) {
        var colNodes = find(rowNodes[row], function () { return true; }, 'th');

        // 校对列序号
        for (var col = this.__colNum + 1; col < colNodes.length; col++) {
            colNodes[col].setAttribute('col', col - 1);
        }

        // 删除当前光标所在列
        remove(colNodes[this.__colNum]);

        // 数据也要删除
        this.__contentArray[this.__tableIndex].content[row - 1].splice(this.__colNum - 1, 1);
    }

    // 重置光标
    this.__btnDom[this.__tableIndex].click();
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/excel/right-menu/index
/*****************************************************************/
window.__pkg__bundleSrc__['241']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('47');
var appendTo =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('222');
var find =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('170');
var stopPropagation =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('225');
var getTargetNode=__pkg__scope_args__.getTargetNode;


__pkg__scope_bundle__.default= function () {
    var _this = this;

    var rightMenuFrame = appendTo(this.__el, "<div class='right-menu-frame' excel>" +
        "    <span class='item' def-type='merge-all' excel>" +
        "        全部合并" +
        "    </span>" +
        "    <span class='item' def-type='merge-cancel' excel>" +
        "        取消合并" +
        "    </span>" +
        "    <span class='line' excel></span>" +
        "    <span class='item' def-type='delete-row' excel>" +
        "        删除当前行" +
        "    </span>" +
        "    <span class='item' def-type='delete-col' excel>" +
        "        删除当前列" +
        "    </span>" +
        "</div>");

    this.__rightMenuDom = rightMenuFrame;

    //  如果点击的是右键菜单，取消全局控制
    bind(rightMenuFrame, 'mousedown', function (event) {
        stopPropagation(event);
    });

    // 对菜单添加点击事件
    var menuClickItems = find(rightMenuFrame, function (node) { return node.getAttribute('def-type'); }, 'span');

    bind(menuClickItems, 'click', function (event) {

        var node = getTargetNode(event);

        // 获取按钮类型
        var defType = node.getAttribute('def-type');

        _this.$$menuHandler(defType, node);

        // 关闭右键菜单
        _this.__isrightmenu = false;
        _this.__rightMenuDom.style.display = 'none';
    });

    this.$$addStyle('right-menu-frame', "" +
        ".right-menu-frame{" +
        "    position:fixed;" +
        "    width:120px;" +
        "    background-color: white;" +
        "    left: 100px;" +
        "    top: 100px;" +
        "    box-shadow: 0 0 9px 0px #bab2b2;" +
        "    font-size: 14px;" +
        "    padding:0 5px;" +
        "}" +
        ".right-menu-frame span{" +
        "    display: block;" +
        "}" +
        ".right-menu-frame .item{" +
        "    padding: 5px 0;" +
        "    cursor: pointer;" +
        "}" +
        ".right-menu-frame .item:hover{" +
        "    font-weight: 800;" +
        "    text-decoration: underline;" +
        "}" +
        ".right-menu-frame .line{" +
        "    height: 1px;" +
        "    background-color: black;" +
        "}");
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/stopPropagation
/*****************************************************************/
window.__pkg__bundleSrc__['170']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 阻止冒泡
__pkg__scope_bundle__.default= function (event) {
    event = event || window.event;
    if (event.stopPropagation) { //这是其他非IE浏览器
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
};

    return __pkg__scope_bundle__;
}
