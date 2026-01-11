
/*************************** [bundle] ****************************/
// Original file:./src/pages/scss/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['82']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('287');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('288');


__pkg__scope_args__=window.__pkg__getBundle('289');
var scssLoader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('171');
var editorRender =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    var sourceEditor, targetEditor;

    return {
        name: "scss",
        render: template,
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "scss转css" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './scss.png');
        },
        mounted: function () {
            sourceEditor = new editorRender({
                el: this._refs.source.value,
                shader: ['css']
            });

            targetEditor = new editorRender({
                el: this._refs.target.value,
                shader: ['css'],
                readonly: true
            });
        },
        methods: {
            scssToCss: function () {
                try {
                    targetEditor.valueOf(scssLoader(sourceEditor.valueOf()));
                } catch (e) {
                    console.error(e);
                    alert('运行出错（' + e + '）');
                }
            }
        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/scss/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['287']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9,15]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"scss转css","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[5,7]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[6]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[10,14]},{"type":"tag","name":"h2","attrs":{},"childNodes":[11,12]},{"type":"text","content":"源代码","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"run","ui-on:click":"scssToCss"},"childNodes":[13]},{"type":"text","content":"运行","childNodes":[]},{"type":"tag","name":"div","attrs":{"ref":"source"},"childNodes":[]},{"type":"tag","name":"div","attrs":{},"childNodes":[16,18]},{"type":"tag","name":"h2","attrs":{},"childNodes":[17]},{"type":"text","content":"运行结果","childNodes":[]},{"type":"tag","name":"div","attrs":{"ref":"target"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/scss/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['288']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"scss\"]{\n\nwidth: calc(100vw - 200px);\n\nheight: calc(100vh - 70px);\n\ntop: 20px;\n\nleft: 100px;\n\nfont-size: 0;\n\nwhite-space: nowrap;\n\n}\n\n [page-view=\"scss\"][focus=\"no\"]>header{\n\nbackground-color: #e8eaed;\n\n}\n\n [page-view=\"scss\"]>header{\n\ntext-align: left;\n\nline-height: 30px;\n\nheight: 30px;\n\nbackground-color: #dee1e7;\n\n}\n\n [page-view=\"scss\"]>header>h2{\n\ncolor: #000000;\n\nfont-size: 16px;\n\npadding-left: 45px;\n\nbackground-image: url(\"./scss-font.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 80%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"scss\"]>div{\n\ndisplay: inline-block;\n\nfont-size: 16px;\n\nwhite-space: normal;\n\nvertical-align: top;\n\noutline: 1px solid #8c9da5;\n\nmargin: 20px 0 0 20px;\n\n}\n\n [page-view=\"scss\"]>div>h2{\n\nborder-bottom: 1px solid #8c9da5;\n\nheight: 50px;\n\nline-height: 50px;\n\npadding: 0 20px;\n\nposition: relative;\n\nfont-family: cursive;\n\nfont-weight: 200;\n\nfont-size: 16px;\n\n}\n\n [page-view=\"scss\"]>div>h2>button{\n\nposition: absolute;\n\nright: 10px;\n\ntop: 10px;\n\nheight: 30px;\n\nline-height: 30px;\n\npadding: 0 20px;\n\nborder: none;\n\noutline: none;\n\ncolor: white;\n\ncursor: pointer;\n\n}\n\n [page-view=\"scss\"]>div>h2>button.run{\n\nbackground-color: #d05a90;\n\n}\n\n [page-view=\"scss\"]>div>div{\n\nwidth: calc(50vw - 130px);\n\nheight: calc(100vh - 190px);\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./bin/loader/scss
/*****************************************************************/
window.__pkg__bundleSrc__['289']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    

                var module={
                    exports:{}
                };
                var exports=module.exports;
        
                var toSelector = function (preSelectorArray, deep) {

    var selectors = preSelectorArray[0], i, j, k;

    // 一层层深入
    for (i = 1; i < deep; i++) {

        var temp = [];
        // 前置循环
        for (j = 0; j < selectors.length; j++) {

            // 预选循环
            for (k = 0; k < preSelectorArray[i].length; k++) {

                temp.push(selectors[j] + preSelectorArray[i][k]);

            }

        }

        selectors = temp;
    }

    // 最后补充 {
    return "\n" + (selectors.join(',')) + "{\n";
};

// 把代码变成代码块
// 比如一个注释就是一块，无论注释的内容有多少
var analyseBlock = function (source) {

    var i = -1,

        // 当前面对的字符
        currentChar = null;

    // 获取下一个字符
    var next = function () {
        currentChar = i++ < source.length - 1 ? source[i] : null;
        return currentChar;
    };

    // 获取往后n个值
    var nextNValue = function (n) {
        return source.substring(i, n + i > source.length ? source.length : n + i);
    };

    var blocks = [];
    var currentBlock = "";

    next();

    while (true) {

        // 先剔除空白字符
        // 保证正式开始的时候匹配的是有效的
        while (new RegExp("[\\x20\\t\\r\\n\\f]").test(currentChar)) {
            next();
        }

        // 如果匹配的字符没有了
        if (currentChar == null) break;

        // 如果是注释
        // /* 类型一 */
        if (nextNValue(2) == '/*') {

            next(); next();
            currentBlock = "/*";

            while (nextNValue(2) != '*/' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            // 对于注释 /* */
            // 如果到结尾都没有闭合，应该提示语法错误
            if (currentChar == null) {
                throw new Error('The comment is not closed.');
            }

            currentBlock += "*/";
            next(); next();

            blocks.push({
                value: currentBlock,
                type: "comment-double"
            });
        }

        // 如果是注释
        // // 类型二
        else if (nextNValue(2) == '//') {
            currentBlock = '';

            while (currentChar != '\n' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            blocks.push({
                value: currentBlock,
                type: "comment-single"
            });

        }

        // 如果是结束
        //  }
        else if (currentChar == '}') {

            blocks.push({
                value: "}",
                type: "end"
            });

            next();

        }

        // 余下，只有两种情况：
        // 1.如是是开始
        //  xxx {
        // 2.可能是一个语句
        //  xxx : xxx ;
        // 这两种都需要进一步匹配
        else {

            currentBlock = '';

            // 目前先没有考虑下列情况：
            // 语句 content:";"
            while (currentChar != '{' && currentChar != ';' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            if (currentChar == null) {
                throw new Error('Statement or code block missing closure.');
            }

            blocks.push({
                value: currentBlock + currentChar,
                type: {
                    '{': "begin",
                    ';': 'statement'
                }[currentChar]
            });

            next();

        }

    }

    return blocks;
};


module.exports = function (source) {

    // 分析出代码块

    var blocks = analyseBlock(source);

    // 根据代码块获得最终代码

    var i, j, cssCode = "", preSelectorArray = [], deep = 0;
    for (i = 0; i < blocks.length; i++) {

        // 注释 double
        if (blocks[i].type == 'comment-double') {

            cssCode += blocks[i].value;

        }

        // 注释 single
        else if (blocks[i].type == 'comment-single') {

            cssCode += "\n/* " + blocks[i].value + " */\n";

        }

        // 开始
        else if (blocks[i].type == 'begin') {

            var preSplit = blocks[i].value.split(',');
            var preSelect = [];
            for (j = 0; j < preSplit.length; j++) {

                // 去掉两端的空格
                preSelect[j] = preSplit[j].replace(/\{$/, '').trim();

                // 判断拼接方式
                if (/^&/.test(preSelect[j])) {
                    preSelect[j] = preSelect[j].replace(/^&/, '');
                } else {
                    preSelect[j] = " " + preSelect[j];
                }

            }

            // 登记到前缀数组
            preSelectorArray[deep] = preSelect;
            deep += 1;
        }

        // 结束
        else if (blocks[i].type == 'end') {

            deep -= 1;

        }

        // 语句
        else if (blocks[i].type == 'statement') {

            // 如果是第一个
            j = 1;
            var preType = blocks[i - j].type;
            while (['comment-double', 'comment-single'].indexOf(preType) > -1) {
                j += 1;
                preType = blocks[i - j].type;
            }
            if (['end', 'begin'].indexOf(preType) > -1) {
                cssCode += toSelector(preSelectorArray, deep);
            }

            cssCode += "\n" + blocks[i].value + "\n";

            // 如果是最后一个
            j = 1;
            var nextType = blocks[i + j].type;
            while (['comment-double', 'comment-single'].indexOf(nextType) > -1) {
                j += 1;
                nextType = blocks[i + j].type;
            }
            if (['end', 'begin'].indexOf(nextType) > -1) {
                cssCode += "\n}\n";
            }

        }

    }

    return cssCode;
};
        
                __pkg__scope_bundle__.default= module.exports;
        
                

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/index
/*****************************************************************/
window.__pkg__bundleSrc__['171']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
__pkg__scope_args__=window.__pkg__getBundle('172');
var trigger =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('61');
var copy =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('48');
var isElement =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('31');
var isString =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('32');
var isFunction =__pkg__scope_args__.default;


// 核心方法和工具方法

__pkg__scope_args__=window.__pkg__getBundle('173');
var textWidth=__pkg__scope_args__.textWidth;
var bestLeftNum=__pkg__scope_args__.bestLeftNum;
var calcCanvasXY=__pkg__scope_args__.calcCanvasXY;
var selectIsNotBlank=__pkg__scope_args__.selectIsNotBlank;
var toTemplate=__pkg__scope_args__.toTemplate;


__pkg__scope_args__=window.__pkg__getBundle('174');
var initDom=__pkg__scope_args__.initDom;
var initView=__pkg__scope_args__.initView;

__pkg__scope_args__=window.__pkg__getBundle('179');
var updateView=__pkg__scope_args__.updateView;
var updateSelectView=__pkg__scope_args__.updateSelectView;
var updateCursorPosition=__pkg__scope_args__.updateCursorPosition;
var updateCanvasSize=__pkg__scope_args__.updateCanvasSize;
var cancelSelect=__pkg__scope_args__.cancelSelect;
var deleteSelect=__pkg__scope_args__.deleteSelect;

__pkg__scope_args__=window.__pkg__getBundle('182');
var bindEvent =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('183');
var diff =__pkg__scope_args__.default;


__pkg__scope_args__=window.__pkg__getBundle('184');
var filterText =__pkg__scope_args__.default;


// 内置着色器方法

__pkg__scope_args__=window.__pkg__getBundle('185');
var innerShader =__pkg__scope_args__.default;


var editor = function (options) {
    var _this = this;

    if (!(this instanceof editor)) {
        throw new Error('Editor is a constructor and should be called with the `new` keyword');
    }

    /**
     *
     * [格式化配置]
     *
     * 所有的配置校验和默认值设置等都应该在这里进行
     * 经过这里处理以后，后续不需要再进行校验了
     * 因此这里的内容的更改一定要慎重
     *
     */

    // 编辑器挂载点
    if (isElement(options.el)) {

        // 着色器
        var shader = function () {
            var resultData = [];
            _this._contentArray.forEach(function (text) {
                resultData.push([{
                    content: text,
                    color: _this._colorText
                }]);
            });
            return resultData;
        };

        // 格式化
        var format = function (textString) { return textString; }

        this._el = options.el;
        this._el.editor_terminal = 'none';

        // 公共配置
        options.color = options.color || {};
        this._colorBackground = options.color.background || "#f5f5f5"; /*编辑器背景*/
        this._colorText = options.color.text || "#000000"; /*普通文本颜色*/
        this._colorNumber = options.color.number || "#888484"; /*行号颜色*/
        this._colorEdit = options.color.edit || "#eaeaf1"; /*编辑行颜色*/
        this._colorCursor = options.color.cursor || "#ff0000"; /*光标颜色*/
        this._colorSelect = options.color.select || "#6c6cf1"; /*选择背景*/
        this._fontFamily = options["font-family"] || "新宋体"; /*字体*/
        this._fontWeight = options["font-weight"] || 600;/*字重*/
        this._tabSpace = options.tabSpace || 4;/*设置一个tab表示多少个空格*/
        this._readonly = options.readonly || false;/*是否只读*/
        this._noLineNumber = options.noLineNumber || false;/*是否隐藏行号*/

        // 文本
        this._contentArray = isString(options.content) ? (this.$$filterText(options.content) + "").replace(/\r/g, '').split("\n") : [""];

        // 着色方法
        this.$shader = isFunction(options.shader) ? options.shader : (Array.isArray(options.shader) ? innerShader.apply(null, options.shader) : shader);

        // 格式化方法
        this.$format = isFunction(options.format) ? options.format : format;

        // 辅助输入
        this.$input = isFunction(options.input) ? options.input : null;

    } else {

        // 挂载点是必须的，一定要有
        throw new Error('options.el is not a element!');
    }

    // 先初始化DOM
    this.$$initDom();

    // 初始化控制变量
    this.__needUpdate = true;
    this.__lineNum = this._contentArray.length - 1;
    this.__leftNum = this._contentArray[this.__lineNum].length;
    this.__cursor1 = this.__cursor2 = { leftNum: 0, lineNum: 0 };
    this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n')));

    // 初始化视图
    this.$$initView();

    // 更新视图
    this.$$updateView();

    // 绑定操作
    this.$$bindEvent();

    this.__updated__ = function () { };
    // 编辑器管理的文本发生改变后会主动触发callback方法
    this.updated = function (callback) {
        _this.__updated__ = callback;
    };

    // 获取当前编辑器代码
    this.valueOf = function (content) {

        if (content || content == '') {

            // 先删除内容
            _this._contentArray = null;

            // 输入以触发更新
            _this.__focusDOM.value = content;
            trigger(_this.__focusDOM, 'input');
            _this.__focusDOM.focus();

        }

        return _this._contentArray.join('\n');
    };

    // 在当前光标位置输入新的内容
    this.input = function (content, cursor, number) {
        content = content || "";
        cursor = cursor || 0;
        number = number || 0;

        // 先删除多余的内容

        if (cursor != 0) {

            if (number != 0) {
                _this._contentArray[_this.__lineNum] =
                    _this._contentArray[_this.__lineNum].substring(0, _this.__leftNum + cursor) +
                    _this._contentArray[_this.__lineNum].substring(_this.__leftNum + cursor + number);
            }

            // 修改光标位置
            _this.__leftNum += cursor;

        }

        // 输入以触发更新
        _this.__focusDOM.value = content;
        trigger(_this.__focusDOM, 'input');
        _this.__focusDOM.focus();

    };

    // 格式化代码
    this.format = function () {

        // 格式化内容
        _this._contentArray = _this.$format(_this._contentArray.join('\n'), _this._tabSpace).split('\n');

        _this.__lineNum = _this._contentArray.length - 1;
        _this.__leftNum = _this._contentArray[_this.__lineNum].length;

        // 着色
        _this.__formatData = _this.$$diff(_this.$shader(_this._contentArray.join('\n')));

        // 更新视图
        _this.$$updateView();

        // 更新光标位置
        _this.$$initView();

    };

    // 复制当前编辑器代码到电脑剪切板
    this.copy = function (callback, errorback) {
        copy(_this.valueOf(), callback, errorback);
    };

};

// 挂载辅助方法
editor.prototype.$$textWidth = textWidth;
editor.prototype.$$bestLeftNum = bestLeftNum;
editor.prototype.$$calcCanvasXY = calcCanvasXY;
editor.prototype.$$selectIsNotBlank = selectIsNotBlank;
editor.prototype.$$filterText = filterText;
editor.prototype.$$toTemplate = toTemplate;

// 挂载核心方法

editor.prototype.$$initDom = initDom;
editor.prototype.$$initView = initView;

editor.prototype.$$updateView = updateView;
editor.prototype.$$updateSelectView = updateSelectView;
editor.prototype.$$updateCursorPosition = updateCursorPosition;
editor.prototype.$$updateCanvasSize = updateCanvasSize;
editor.prototype.$$cancelSelect = cancelSelect;
editor.prototype.$$deleteSelect = deleteSelect;

editor.prototype.$$bindEvent = bindEvent;

// 性能优化系列方法

editor.prototype.$$diff = diff;

__pkg__scope_bundle__.default= editor;


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/trigger
/*****************************************************************/
window.__pkg__bundleSrc__['172']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
      // 触发事件
  __pkg__scope_bundle__.default= function (dom, eventType) {
    var event;

    //创建event的对象实例。
    if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        event = document.createEventObject();
        dom.fireEvent('on' + eventType, event);
    }

    // 其他标准浏览器使用dispatchEvent方法
    else {
        event = document.createEvent('HTMLEvents');
        // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
        event.initEvent(eventType, true, false);
        dom.dispatchEvent(event);
    }

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/copy
/*****************************************************************/
window.__pkg__bundleSrc__['61']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('32');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('47');
var appendTo =__pkg__scope_args__.default;


// 复制到剪切板
__pkg__scope_bundle__.default= function (text, callback, errorback) {

    var el = appendTo(document.body, '<textarea>' + text + '</textarea>');

    // 执行复制
    el.select();
    try {
        var result = window.document.execCommand("copy", false, null);

        if (result) {
            if (isFunction(callback)) callback();
        } else {
            if (isFunction(errorback)) errorback();
        }
    } catch (e) {
        if (isFunction(errorback)) errorback(e);
    }

    document.body.removeChild(el);

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/tool
/*****************************************************************/
window.__pkg__bundleSrc__['173']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 计算文字长度

__pkg__scope_bundle__.textWidth=function(text) {
    this.__helpCalcDOM.innerText = text;
    return this.__helpCalcDOM.offsetWidth;
};

// 计算最佳光标左边位置

__pkg__scope_bundle__.bestLeftNum=function(x, lineNum) {

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

__pkg__scope_bundle__.calcCanvasXY=function(leftNum, lineNum) {

    return {
        x: this.$$textWidth(this._contentArray[lineNum].substr(0, leftNum)),
        y: lineNum * 21
    };

};

// 判断选区是否为空

__pkg__scope_bundle__.selectIsNotBlank=function() {
    return this.__cursor1.lineNum != this.__cursor2.lineNum || this.__cursor1.leftNum != this.__cursor2.leftNum;
};

// 根据内容生成模板

__pkg__scope_bundle__.toTemplate=function(line, index, noLineNumber) {
    var _this = this;

    var template = "";

    template += "<div style='min-width: fit-content;white-space: nowrap;line-height:21px;height:21px;'>";

    var lineStyle = noLineNumber ? "font-size:0;" : "";

    template += "<em style='" + lineStyle + "color:" + this._colorNumber + ";user-select: none;display:inline-block;font-style:normal;width:35px;text-align:right;margin-right:5px;'>" + (index + 1) + "</em>";

    line.forEach(function (text) {

        var contentText = text.content;

        // 提前对特殊字符进行处理
        contentText = contentText.replace(/\&/g, "&amp;");/*[&]*/
        contentText = contentText.replace(/</g, "&lt;"); contentText = contentText.replace(/>/g, "&gt;");/*[<,>]*/

        template += "<span style='user-select: none;font-weight:" + _this._fontWeight + ";white-space: pre;color:" + text.color + "'>" + contentText + "</span>";

    });

    return template + "</div>";
};

// 整理当前输入框信息

__pkg__scope_bundle__.getInputMessage=function(editor) {
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

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/init
/*****************************************************************/
window.__pkg__bundleSrc__['174']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('175');
var setStyle =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('47');
var appendTo =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('176');
var stopPropagation =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('177');
var preventDefault =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('178');
var attr =__pkg__scope_args__.default;


// 初始化结点

__pkg__scope_bundle__.initDom=function() {
    var _this = this;

    this._el.innerHTML = "";

    setStyle(this._el, {
        "font-size": "12px",
        position: "relative",
        cursor: "text",
        "font-family": this._fontFamily,
        "background": this._colorBackground,
        overflow: "auto"
    });

    bind(this._el, 'click', function () {

        // 由于有时候点击屏幕的时候，是滚动导致的，因此位置可能没有计算好前聚焦了，导致光标错位
        setTimeout(function () {
            _this.__focusDOM.focus();
        });

    })

    // 辅助计算标签
    this.__helpCalcDOM = appendTo(this._el, "<span></span>");

    setStyle(this.__helpCalcDOM, {
        position: "absolute",
        "z-index": "-1",
        "white-space": "pre",
        "top": 0,
        "left": 0,
        "color": "rgba(0,0,0,0)",
        "font-weight": this._fontWeight
    });

    // 辅助输入标签
    this.__helpInputDOM = appendTo(this._el, "<div></div>");

    setStyle(this.__helpInputDOM, {
        position: "absolute",
        "z-index": 1
    });

    bind(this.__helpInputDOM, 'click', function (event) {

        stopPropagation(event);
        preventDefault(event);

        _this.__focusDOM.focus();

    });

    // 光标
    this.__focusDOM = appendTo(this._el, "<textarea></textarea>");

    setStyle(this.__focusDOM, {
        position: "absolute",
        width: "6px",
        "margin-top": "3px",
        height: "15px",
        "line-height": "15px",
        resize: "none",
        overflow: "hidden",
        padding: "0",
        outline: "none",
        border: "none",
        background: "rgba(0,0,0,0)",
        color: this._colorCursor
    });

    attr(this.__focusDOM, {
        wrap: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false"
    });

    if (this._readonly) {
        attr(this.__focusDOM, {
            readonly: true
        });
    }

    // 显示区域
    this.__showDOM = appendTo(this._el, "<div></div>");

    setStyle(this.__showDOM, {
        padding: "10px 0"
    });

    // 选中区域
    this.__selectCanvas = appendTo(this._el, "<canvas></canvas>");

    setStyle(this.__selectCanvas, {
        position: "absolute",
        left: "40px",
        top: "10px",
        opacity: "0.5"
    });

    this.$$updateCanvasSize(1, 1);

};

// 初始化视图

__pkg__scope_bundle__.initView=function() {

    // 初始化定位光标位置
    setStyle(this.__focusDOM, {
        left: (40 + this.$$textWidth(this._contentArray[this.__lineNum])) + "px",
        top: (10 + this.__lineNum * 21) + "px"
    });

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/setStyle
/*****************************************************************/
window.__pkg__bundleSrc__['175']=function(){
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
// Original file:./src/tool/xhtml/stopPropagation
/*****************************************************************/
window.__pkg__bundleSrc__['176']=function(){
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

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/preventDefault
/*****************************************************************/
window.__pkg__bundleSrc__['177']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 阻止默认事件
__pkg__scope_bundle__.default= function (event) {
    event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/attr
/*****************************************************************/
window.__pkg__bundleSrc__['178']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 修改属性
__pkg__scope_bundle__.default= function (el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/update
/*****************************************************************/
window.__pkg__bundleSrc__['179']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('175');
var setStyle =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('178');
var attr =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('180');
var prependTo =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('181');
var after =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('33');
var remove =__pkg__scope_args__.default;


// 更新编辑器内容视图

__pkg__scope_bundle__.updateView=function() {
    var _this = this;

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
            remove(lineDoms[i]);
        }

        // 追加不足的行
        if (this.__diff.beginNum > 0) {
            for (var i = this.__formatData.length - 1 - this.__diff.endNum; i >= this.__diff.beginNum; i--) {
                after(lineDoms[this.__diff.beginNum - 1], this.$$toTemplate(this.__formatData[i], i, this._noLineNumber));
            }
        } else {

            // 如果开头没有结点保留，为了简单，我们直接采用prependTo方法追加
            for (var i = this.__formatData.length - this.__diff.endNum - 1; i >= 0; i--) {
                prependTo(this.__showDOM, this.$$toTemplate(this.__formatData[i], i, this._noLineNumber));
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
        this.__formatData.forEach(function (line, index) {
            template += _this.$$toTemplate(line, index, _this._noLineNumber);
        });
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

__pkg__scope_bundle__.updateSelectView=function() {
    var _this = this;

    var ctx = this.__selectCanvas.getContext('2d');
    ctx.fillStyle = this._colorSelect;
    ctx.clearRect(0, 0, this.__selectCanvas.scrollWidth, this.__selectCanvas.scrollHeight);

    // 绘制两个区间
    var drawerSelect = function (beginLeftNum, endLeftNum, lineNum) {

        var xy1 = _this.$$calcCanvasXY(beginLeftNum, lineNum);
        var xy2 = _this.$$calcCanvasXY(endLeftNum, lineNum);

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

__pkg__scope_bundle__.updateCursorPosition=function() {

    this.__cursorTop = this.__lineNum * 21 + 10;
    this.__cursorLeft = 40 + this.$$textWidth(this._contentArray[this.__lineNum].substring(0, this.__leftNum));

    setStyle(this.__focusDOM, {
        top: this.__cursorTop + "px",
        left: this.__cursorLeft + "px",
    });

};

// 更新画布尺寸

__pkg__scope_bundle__.updateCanvasSize=function(width, height) {

    if (arguments.length < 2) {
        width = this._el.scrollWidth - 40;
        height = this._el.scrollHeight - 10;
    }

    setStyle(this.__selectCanvas, {
        width: width + "px",
        height: height + "px",
    });

    attr(this.__selectCanvas, {
        width: width,
        height: height
    });

};

// 取消选区

__pkg__scope_bundle__.cancelSelect=function() {

    this.$$updateCanvasSize(1, 1);
    this.__cursor1 = { leftNum: 0, lineNum: 0 };
    this.__cursor2 = { leftNum: 0, lineNum: 0 };

};

// 删除选区

__pkg__scope_bundle__.deleteSelect=function() {

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


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/prependTo
/*****************************************************************/
window.__pkg__bundleSrc__['180']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('48');
var isElement =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('49');
var toNode =__pkg__scope_args__.default;


// 追加节点(内部开头)
__pkg__scope_bundle__.default= function (el, template) {
    var node = isElement(template) ? template : toNode(template);
    el.insertBefore(node, el.childNodes[0]);
    return node;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/xhtml/after
/*****************************************************************/
window.__pkg__bundleSrc__['181']=function(){
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
// Original file:./src/tool/editor/edit-view/bind
/*****************************************************************/
window.__pkg__bundleSrc__['182']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('166');
var getKeyString=__pkg__scope_args__.getKeyString;

__pkg__scope_args__=window.__pkg__getBundle('32');
var isFunction =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('22');
var bind =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('101');
var mousePosition =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('61');
var copy =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('176');
var stopPropagation =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('177');
var preventDefault =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('173');
var getInputMessage=__pkg__scope_args__.getInputMessage;


// 绑定键盘和鼠标等交互事件处理

__pkg__scope_bundle__.default= function () {
    var _this = this;

    // 鼠标是否按下
    var mouseDown = false;

    // shift是否按下
    var shiftDown = false;

    // 辅助计算选择光标位置
    var calcCursor = function (event) {
        var position = mousePosition(_this._el, event);
        var topIndex = Math.round((position.y - 20.5) / 21);

        if (topIndex < 0) topIndex = 0;
        if (topIndex >= _this._contentArray.length) topIndex = _this._contentArray.length - 1;

        return {
            leftNum: _this.$$bestLeftNum(position.x, topIndex),
            lineNum: topIndex
        };
    };

    // 获取光标之间的内容
    var calcTwoCursor = function () {

        // 假定cursor2是结束光标
        var beginCursor = _this.__cursor2,
            endCursor = _this.__cursor1;

        // 根据行号来校对
        if (_this.__cursor1.lineNum < _this.__cursor2.lineNum) {
            beginCursor = _this.__cursor1;
            endCursor = _this.__cursor2;
        } else if (_this.__cursor1.lineNum == _this.__cursor2.lineNum) {

            // 根据列号来校对
            if (_this.__cursor1.leftNum < _this.__cursor2.leftNum) {
                beginCursor = _this.__cursor1;
                endCursor = _this.__cursor2;
            }

            return _this._contentArray[beginCursor.lineNum].substring(beginCursor.leftNum, endCursor.leftNum);
        }

        // 余下的一定是多行
        var resultData = "";
        resultData += _this._contentArray[beginCursor.lineNum].substr(beginCursor.leftNum) + "\n";
        for (var lineNum = beginCursor.lineNum + 1; lineNum < endCursor.lineNum; lineNum++) {
            resultData += _this._contentArray[lineNum] + "\n";
        }
        resultData += _this._contentArray[endCursor.lineNum].substr(0, endCursor.leftNum);

        return resultData;

    };

    // 鼠标按下的时候，记录开始光标位置并标记鼠标按下动作
    bind(this._el, 'mousedown', function (event) {
        mouseDown = true;
        _this.__cursor2 = _this.__cursor1 = calcCursor(event);

        _this.$$updateCanvasSize();

        // 绘制选中效果
        _this.$$updateSelectView();

    });

    // 移动的时候不停的同步结束光标位置
    bind(this._el, 'mousemove', function (event) {
        if (!mouseDown) return;
        _this.__cursor2 = calcCursor(event);

        // 绘制选中效果
        _this.$$updateSelectView();
    });

    // 鼠标放开或移出的时候，标记鼠标放开
    bind(this._el, 'mouseup', function () { mouseDown = false });

    // 点击编辑界面
    bind(this._el, 'click', function (event) {

        _this.__helpInputDOM.innerHTML = '';

        var position = mousePosition(_this._el, event);
        var topIndex = Math.round((position.y - 20.5) / 21);

        // 如果超过了内容区域
        if (topIndex < 0 || topIndex >= _this._contentArray.length) return;

        var __lineNum = topIndex;
        var __leftNum = _this.$$bestLeftNum(position.x, __lineNum);

        // 多选
        if (shiftDown) {
            _this.__cursor1 = {
                leftNum: _this.__leftNum,
                lineNum: _this.__lineNum
            };
            _this.__cursor2 = {
                leftNum: __leftNum,
                lineNum: __lineNum
            };

            // 绘制选中效果
            _this.$$updateSelectView();
        }

        // 普通点击
        else {
            _this.__lineNum = __lineNum;
            _this.__leftNum = __leftNum;
            _this.$$updateCursorPosition();
            _this.$$updateView();
        }

    });

    // 双击编辑器界面
    bind(this._el, 'dblclick', function () {
        var formateData = _this.__formatData[_this.__lineNum];

        // 求解左边边界
        var _left;
        for (var i = 0, leftLen = 0; i < formateData.length; i++) {
            if (leftLen + formateData[i].content.length > _this.__leftNum) {
                _left = leftLen;
                break;
            } else {
                leftLen += formateData[i].content.length;
            }
        }

        // 求解右边界
        var _right;
        for (var i = 0, leftLen = 0; i < formateData.length; i++) {
            if (leftLen + formateData[i].content.length > _this.__leftNum) {
                _right = leftLen + formateData[i].content.length;
                break;
            } else {
                leftLen += formateData[i].content.length;
            }
        }

        /**
         * 由于前置cursor1和cursor2是对象，直接修改leftNum无法成功
         */

        _this.__cursor1 = {
            leftNum: _left,
            lineNum: _this.__lineNum
        };
        _this.__cursor2 = {
            leftNum: _right,
            lineNum: _this.__lineNum
        };

        // 绘制选中效果
        _this.$$updateSelectView();
    });

    var update = function (text) {

        // 获取输入内容
        text = text || _this.__focusDOM.value;

        text = _this.$$filterText(text);

        _this.__focusDOM.value = "";

        // 如果有选区，先删除选区
        if (_this.$$selectIsNotBlank()) _this.$$deleteSelect();

        // 如果输入的是回车，切割文本
        if (/^\n$/.test(text)) {

            if (_this.__leftNum >= _this._contentArray[_this.__lineNum].length) {
                _this._contentArray.splice(_this.__lineNum + 1, 0, "");
            } else {
                _this._contentArray.splice(_this.__lineNum + 1, 0, _this._contentArray[_this.__lineNum].substring(_this.__leftNum));
                _this._contentArray[_this.__lineNum] = _this._contentArray[_this.__lineNum].substring(0, _this.__leftNum);
            }
            _this.__lineNum += 1;
            _this.__leftNum = 0;

        }

        // 否则就是一堆文本（包括复制来的）
        else {

            var textArray = text.split(/\n/);

            if (_this._contentArray == null) {
                _this._contentArray = textArray;
                _this.__lineNum = _this._contentArray.length - 1;
                _this.__leftNum = _this._contentArray[_this.__lineNum].length;
            }

            // 如果只有一行文本(分开是为了加速)
            else if (textArray.length <= 1) {
                _this._contentArray[_this.__lineNum] = _this._contentArray[_this.__lineNum].substring(0, _this.__leftNum) + text + _this._contentArray[_this.__lineNum].substring(_this.__leftNum);
                _this.__leftNum += text.length;
            }

            // 如果是复制的多行文本
            else {

                // 需要切割的行两边文本
                var leftText = _this._contentArray[_this.__lineNum].substring(0, _this.__leftNum);
                var rightText = _this._contentArray[_this.__lineNum].substring(_this.__leftNum);

                // 旧行文本拼接进来
                textArray[0] = leftText + textArray[0];
                textArray[textArray.length - 1] += rightText;

                // 新内容记录下来
                // _this._contentArray.splice(_this.__lineNum, 1, ...textArray);
                _this._contentArray.splice(_this.__lineNum, 1);
                for (var index = 0; index < textArray.length; index++) {
                    _this._contentArray.splice(_this.__lineNum + index, 0, textArray[index]);
                }

                _this.__lineNum += (textArray.length - 1);
                _this.__leftNum = textArray[textArray.length - 1].length - rightText.length;

            }

        }

        // 着色并更新视图

        _this.__formatData = _this.$$diff(_this.$shader(_this._contentArray.join('\n')));
        _this.$$updateCursorPosition();
        _this.$$updateView();

        // 通知文本改动
        _this.__updated__();

    };

    // 中文输入开始
    bind(this.__focusDOM, 'compositionstart', function () {
        _this.__needUpdate = false;
        _this.__focusDOM.style.color = "rgba(0,0,0,0)";
        _this.__focusDOM.style.borderLeft = '1px solid ' + _this._colorCursor;
    });

    // 中文输入结束
    bind(this.__focusDOM, 'compositionend', function () {
        _this.__needUpdate = true;
        _this.__focusDOM.style.color = _this._colorCursor;
        _this.__focusDOM.style.borderLeft = "none";
        update();

        // 辅助输入
        if (_this.$input != null) _this.__helpInputEvent = _this.$input(_this.__helpInputDOM, getInputMessage(_this), _this._contentArray) || {};
    });

    // 输入
    bind(this.__focusDOM, 'input', function () {
        // 如果是中文输入开始，不应该更新
        if (_this.__needUpdate) {
            update();

            // 辅助输入
            if (_this.$input != null) _this.__helpInputEvent = _this.$input(_this.__helpInputDOM, getInputMessage(_this), _this._contentArray) || {};
        }
    });

    // 记录此刻MAC电脑的Command是否按下
    var macCommand = false;

    bind(this._el, 'keyup', function (event) {

        var keyStringCode = getKeyString(event);

        if (keyStringCode == 'command') macCommand = false;

        // 取消shift被按下标志
        shiftDown = false;

    });

    // 处理键盘控制
    bind(this._el, 'keydown', function (event) {

        var keyStringCode = getKeyString(event);

        if (keyStringCode == 'command') macCommand = true;

        // 如果Command被按下，就需要补充ctrl以兼容MAC电脑
        if (macCommand && ['a', 'c', 'x'].indexOf(keyStringCode) > -1) {
            keyStringCode = "ctrl+" + keyStringCode;
        }

        // 辅助输入前置拦截

        if (_this.__helpInputDOM.innerHTML != '') {
            var __helpInputEvent = _this.__helpInputEvent[keyStringCode];

            if (isFunction(__helpInputEvent)) {

                // 如果返回true表示继续调用，否则此快捷键结束
                if (!__helpInputEvent()) return;
            } else {
                _this.__helpInputDOM.innerHTML = '';
            }
        }

        // 只读模式需要拦截部分快捷键
        // 命令行不拦截
        if (_this._readonly && ['ctrl+a', 'ctrl+c'].indexOf(keyStringCode) < 0) return;

        if (keyStringCode == 'shift') shiftDown = true;

        // 进入常规快捷键

        switch (keyStringCode) {

            // 全选
            case "ctrl+a":
                {

                    // 修改选区范围
                    _this.__cursor1 = { leftNum: 0, lineNum: 0 };
                    _this.__cursor2 = { lineNum: _this._contentArray.length - 1, leftNum: _this._contentArray[_this._contentArray.length - 1].length };

                    // 绘制选中效果
                    _this.$$updateSelectView();

                    break;
                }

            // 复制
            case "ctrl+c":
                {
                    if (_this.$$selectIsNotBlank()) {
                        copy(calcTwoCursor());
                        _this.__focusDOM.focus();
                    }
                    break;
                }

            // 剪切
            case "ctrl+x":
                {
                    if (_this.$$selectIsNotBlank()) {

                        copy(calcTwoCursor());
                        _this.__focusDOM.focus();
                        _this.$$deleteSelect();

                        // 由于内容改变，需要重新调用着色
                        _this.__formatData = _this.$$diff(_this.$shader(_this._contentArray.join('\n')));

                        // 更新视图
                        _this.$$updateCursorPosition();
                        _this.$$updateView();
                        _this.$$cancelSelect();

                        // 通知文本改动
                        _this.__updated__();

                    }
                    break;
                }

            // 多空格输入或多行移位
            case "tab":
                {

                    // tab用来控制输入多个空格，默认事件需要禁止
                    stopPropagation(event);
                    preventDefault(event);

                    // 计算空格
                    var blanks = "";
                    for (var i = 0; i < _this._tabSpace; i++) blanks += " ";

                    // 如果有选区，特殊处理
                    if (_this.$$selectIsNotBlank()) {

                        var beginLineNum = _this.__cursor1.lineNum,
                            endLineNum = _this.__cursor2.lineNum;
                        if (beginLineNum > endLineNum) {
                            beginLineNum = _this.__cursor2.lineNum;
                            endLineNum = _this.__cursor1.lineNum;
                        }

                        // 在开头追究tab
                        for (var lineNum = beginLineNum; lineNum <= endLineNum; lineNum++) {
                            _this._contentArray[lineNum] = blanks + _this._contentArray[lineNum];
                        }

                        // 校对选择区域
                        _this.__cursor1.leftNum += _this._tabSpace;
                        _this.__cursor2.leftNum += _this._tabSpace;

                        // 校对光标
                        _this.__leftNum += _this._tabSpace;

                        _this.__formatData = _this.$$diff(_this.$shader(_this._contentArray.join('\n')));
                        _this.$$updateCursorPosition();
                        _this.$$updateView();
                        _this.$$updateCanvasSize();
                        _this.$$updateSelectView();

                        // 通知文本改动
                        _this.__updated__();

                    } else {
                        update(blanks);
                    }

                    break;
                }

            // 光标向上
            case "up":
                {

                    // 如果是第一行不需要任何处理
                    if (_this.__lineNum <= 0) return;

                    // 向上一行
                    _this.__lineNum -= 1;

                    _this.__leftNum = _this.$$bestLeftNum(_this.$$textWidth(_this._contentArray[_this.__lineNum + 1].substr(0, _this.__leftNum)) + 40);

                    _this.$$updateCursorPosition();
                    _this.$$updateView();
                    _this.$$cancelSelect();

                    _this._el.scrollTop -= 21;

                    break;
                }

            // 光标向下
            case "down":
                {

                    if (_this.__lineNum >= _this._contentArray.length - 1) return;

                    // 向下一行
                    _this.__lineNum += 1;

                    _this.__leftNum = _this.$$bestLeftNum(_this.$$textWidth(_this._contentArray[_this.__lineNum - 1].substr(0, _this.__leftNum)) + 40);

                    _this.$$updateCursorPosition();
                    _this.$$updateView();
                    _this.$$cancelSelect();

                    _this._el.scrollTop += 21;

                    break;
                }

            // 光标向左
            case "left":
                {

                    if (_this.__leftNum <= 0) {
                        if (_this.__lineNum <= 0) return;
                        _this.__lineNum -= 1;
                        _this.__leftNum = _this._contentArray[_this.__lineNum].length;
                    } else {
                        _this.__leftNum -= 1;
                    }

                    _this.$$updateCursorPosition();
                    _this.$$cancelSelect();

                    break;
                }

            // 光标向右
            case "right":
                {

                    if (_this.__leftNum >= _this._contentArray[_this.__lineNum].length) {
                        if (_this.__lineNum >= _this._contentArray.length - 1) return;
                        _this.__lineNum += 1;
                        _this.__leftNum = 0;
                    } else {
                        _this.__leftNum += 1;
                    }

                    _this.$$updateCursorPosition();
                    _this.$$cancelSelect();

                    break;
                }

            // 删除
            case "backspace":
                {

                    // 如果有选区
                    if (_this.$$selectIsNotBlank()) {

                        // 删除选区
                        _this.$$deleteSelect();

                    }

                    // 无选区的常规操作
                    else {
                        if (_this.__leftNum <= 0) {
                            if (_this.__lineNum <= 0) return;

                            _this.__lineNum -= 1;
                            _this.__leftNum = _this._contentArray[_this.__lineNum].length;

                            // 一行的开头应该删除本行（合并到前一行）
                            _this._contentArray[_this.__lineNum] += _this._contentArray[_this.__lineNum + 1];
                            _this._contentArray.splice(_this.__lineNum + 1, 1);

                        } else {
                            _this.__leftNum -= 1;
                            _this._contentArray[_this.__lineNum] = _this._contentArray[_this.__lineNum].substring(0, _this.__leftNum) + _this._contentArray[_this.__lineNum].substring(_this.__leftNum + 1);
                        }
                    }

                    // 由于内容改变，需要重新调用着色
                    _this.__formatData = _this.$$diff(_this.$shader(_this._contentArray.join('\n')));

                    // 更新视图
                    _this.$$updateCursorPosition();
                    _this.$$updateView();
                    _this.$$cancelSelect();

                    // 通知文本改动
                    _this.__updated__();

                    break;
                }
        }

    });

};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/keyCode
/*****************************************************************/
window.__pkg__bundleSrc__['166']=function(){
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
// Original file:./src/tool/xhtml/mousePosition
/*****************************************************************/
window.__pkg__bundleSrc__['101']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 获取鼠标相对特定元素左上角位置
__pkg__scope_bundle__.default= function (el, event) {

    event = event || window.event;

    // 返回元素的大小及其相对于视口的位置
    var bounding = el.getBoundingClientRect();

    if (!event || !event.clientX)
        throw new Error('Event is necessary!');
    var temp = {

        // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
        "x": event.clientX - bounding.left + el.scrollLeft,
        "y": event.clientY - bounding.top + el.scrollTop
    };

    return temp;
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/diff
/*****************************************************************/
window.__pkg__bundleSrc__['183']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 判断一行是否匹配

var euqalLine = function (line1, line2) {
    if (line1.length != line2.length) return false;
    for (var i = 0; i < line1.length; i++) {
        if (line1[i].content != line2[i].content || line1[i].color != line2[i].color) return false;
    }
    return true;
};

/**
 * 为了加速页面渲染，我们引入差异对比
 * 简单的理解就是：
 * 原本在数据改变的时候直接更新整个DOM的方式替换成只功能必要的DOM
 */

__pkg__scope_bundle__.default= function (newFormatData) {

    /**
     * 思路：
     * 
     * 从开始匹配无法匹配的，匹配条个数记作beginNum
     * 再从结尾匹配无法匹配的，匹配条个数记作endNum
     * 只有begin和end之间的数据需要更新DOM
     * 
     * 当然，也有特殊情况，因此在进行回归前，先把特殊情况提取处理
     * 
     */

    var oldFormatData = this.__formatData;

    if (oldFormatData) {
        // 寻找开始匹配行数
        var beginNum = 0;
        for (var i = 0; i < oldFormatData.length && i < newFormatData.length; i++) {
            if (!euqalLine(oldFormatData[i], newFormatData[i])) {
                break;
            }
            beginNum += 1;
        }

        // 寻找结束匹配行数
        var endNum = 0;
        for (var i = 1; i <= oldFormatData.length && i <= newFormatData.length; i++) {
            if (!euqalLine(oldFormatData[oldFormatData.length - i], newFormatData[newFormatData.length - i])) {
                break;
            }
            endNum += 1;
        }

        var minLength = Math.min(oldFormatData.length, newFormatData.length);

        // 校对(如果复用重叠了)
        if (beginNum + endNum >= minLength) {
            endNum = minLength - beginNum - 1;

            // 由于不知道是删除还是增加，因此可能出现负数
            if (endNum < 0) endNum = 0;
        }

        // 对比以后的差异信息
        this.__diff = {
            beginNum: beginNum,
            endNum: endNum
        };

    }

    return newFormatData;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/editor/edit-view/filter
/*****************************************************************/
window.__pkg__bundleSrc__['184']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 外来文本统一过滤处理

__pkg__scope_bundle__.default= function (oralStr) {

    // 把tab统一变成空格
    var tab = "";
    for (var i = 0; i < this._tabSpace; i++) {
        tab += " ";
    }

    return oralStr.replace(/\t/g, tab);
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/shader/index
/*****************************************************************/
window.__pkg__bundleSrc__['185']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    /**
 * 代码着色计算
 */

// 合并内容

var toShaderReult = function (words) {

    var resultData = [[]], lineNum = 0;

    words.forEach(function (word) {

        var codeArray = word.content.split(/\n/), index;

        resultData[lineNum].push({
            color: word.color,
            content: codeArray[0]
        });

        for (index = 1; index < codeArray.length; index++) {
            lineNum += 1;
            resultData.push([]);

            resultData[lineNum].push({
                color: word.color,
                content: codeArray[index]
            });

        }

    });

    return resultData;
};

// 初始化配置文件

var initConfig = function (init, data) {
    var key;
    for (key in data)
        try {
            init[key] = data[key];
        } catch (e) {
            throw new Error("Illegal property value！");
        }
    return init;
};

__pkg__scope_args__=window.__pkg__getBundle('186');
var _inner_HTML_shader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('187');
var _inner_CSS_shader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('188');
var _inner_ES_shader =__pkg__scope_args__.default;


var _deafultColors_html = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#555",/*符号颜色*/
    "node": "#1e50b3",/*结点颜色*/
    "attrKey": "#1e83b1",/*属性名称颜色*/
    "attrValue": "#ac4c1e",/*属性值颜色*/
};
var _deafultColors_css = {
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#555",/*符号颜色*/
    "selector": "#1e50b3",/*选择器*/
    "attrKey": "#1e83b1",/*属性名称颜色*/
    "attrValue": "#ac4c1e"/*属性值颜色*/
};
var _deafultColors_javascript = {
    "text": "#000000",/*文本颜色*/
    "annotation": "#6a9955",/*注释颜色*/
    "insign": "#555",/*符号颜色*/
    "key": "#ff0000",/*关键字颜色*/
    "string": "#ac4c1e",/*字符串颜色*/
    "funName": "#1e50b3",/*函数名称颜色*/
    "execName": "#1e83b1"/*执行方法颜色*/
};

__pkg__scope_bundle__.default= function (lang, colors) {
    colors = colors || {};

    var _inner_shader, _inner_colors;

    if (lang == 'html') {

        colors._css = initConfig(_deafultColors_css, colors.css);
        colors._javascript = initConfig(_deafultColors_javascript, colors.javascript);
        _inner_colors = initConfig(_deafultColors_html, colors);

        _inner_shader = _inner_HTML_shader;

    } else if (lang == 'css') {

        _inner_colors = initConfig(_deafultColors_css, colors);

        _inner_shader = _inner_CSS_shader;

    } else if (lang == 'javascript') {

        _inner_colors = initConfig(_deafultColors_javascript, colors);

        _inner_shader = _inner_ES_shader;

    } else {
        throw new Error('Language not supported:' + lang + ",The languages available include: html、css、javascript!");
    }

    return function (textString) {

        return toShaderReult(_inner_shader(textString, _inner_colors));

    };

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/shader/html
/*****************************************************************/
window.__pkg__bundleSrc__['186']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('187');
var _inner_CSS_shader =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('188');
var _inner_ES_shader =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (textString, colors) {

    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    // 匹配属性值模板
    var getAttrValueTemplate = function () {
        var endStr = " ";
        // 寻找属性值边界
        if (nextNValue(1) == '"') endStr = '"';
        if (nextNValue(1) == "'") endStr = "'";

        // 到达边界前一直寻找下一个
        do {
            template += textString[i++];
        } while (nextNValue(1) != endStr && i < textString.length);

        // 如果是匹配成功而不是匹配到末尾
        if (endStr != " " && i < textString.length) {
            template += endStr;
            i += 1;
        }

        shaderArray.push({
            color: colors.attrValue,
            content: template
        });
        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(4) == '<!--') {

            initTemplate();
            while (nextNValue(3) !== '-->' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(3)
            });
            i += 3;
            template = "";

        }

        /* 2.</ */

        else if (nextNValue(2) == '</') {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "</"
            });
            i += 2;

            while (nextNValue(1) !== '>' && i < textString.length) {
                template += textString[i++];
            }

            if (template != "") {
                shaderArray.push({
                    color: colors.node,
                    content: template
                });
                template = "";

                if (i < textString.length) {
                    shaderArray.push({
                        color: colors.insign,
                        content: ">"
                    });
                    i += 1;
                }

            }
        }

        /* 3.< */

        else if (nextNValue(1) == '<' && nextNValue(2) != '< ') {

            var specialTag = "";

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: "<"
            });
            i += 1;

            // 寻找标签名称
            while (nextNValue(1) != '>' && nextNValue(1) != ' ' && i < textString.length) {
                template += textString[i++];
            }
            if (template != '') {

                // 针对style和script这样特殊的标签，内部需要调用对应的着色器着色
                if (template == "style" || template == 'script') {
                    specialTag = "</" + template + ">";
                }

                shaderArray.push({
                    color: colors.node,
                    content: template
                });

                template = '';
                if (i < textString.length) {

                    // 寻找标签属性
                    while (i < textString.length) {

                        // 遇到这个表示标签结束了
                        // 也就意味着标签匹配结束
                        if (nextNValue(1) == ">") {

                            initTemplate();
                            shaderArray.push({
                                color: colors.insign,
                                content: ">"
                            });
                            i += 1;
                            break;
                        }

                        // 如果是空格，表示是属性之间，接着查看下一个即可
                        else if (nextNValue(1) != ' ') {

                            initTemplate();

                            // 匹配属性名称
                            if (nextNValue(1) != '"' && nextNValue(1) != "'") {

                                // 如果不是=或>和空格就继续
                                while (nextNValue(1) != "=" && nextNValue(1) != '>' && i < textString.length && nextNValue(1) != " ") {
                                    template += textString[i++];
                                }
                                if (template != "") {
                                    shaderArray.push({
                                        color: colors.attrKey,
                                        content: template
                                    });
                                    template = "";

                                    // 如果下一个是=，就接着找属性值
                                    if (nextNValue(1) == '=') {
                                        shaderArray.push({
                                            color: colors.insign,
                                            content: "="
                                        });
                                        i += 1;


                                        if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {
                                            // 寻找属性值
                                            getAttrValueTemplate();

                                        }
                                    }
                                } else {
                                    template += textString[i++];
                                }
                            } else if (nextNValue(1) == '=') {
                                shaderArray.push({
                                    color: colors.insign,
                                    content: "="
                                });
                                i += 1;
                            } else {
                                if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {

                                    getAttrValueTemplate();

                                }
                            }

                        } else {
                            template += textString[i++];
                        }

                    }

                }

            }

            if (specialTag != "") {

                var oldI = i, oldTemplate = template, langHelp, innerShaderArray;
                while (nextNValue(specialTag.length) != specialTag && i < textString.length) {
                    template += textString[i++];
                }

                if (i < textString.length) {

                    langHelp = specialTag.replace(/<\//, '');

                    innerShaderArray = {
                        "style>": _inner_CSS_shader,
                        "script>": _inner_ES_shader
                    }[langHelp](template, {
                        "style>": colors._css,
                        "script>": colors._javascript
                    }[langHelp]);

                    innerShaderArray.forEach(function (innerShader) {
                        shaderArray.push(innerShader);
                    });

                    template = "";
                } else {
                    template = oldTemplate;
                    i = oldI;
                }

            }

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;

}


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/shader/css
/*****************************************************************/
window.__pkg__bundleSrc__['187']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (textString, colors) {
    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 1:选择器 tag
    // 2:属性名 attr
    // 3:属性值 string
    var state = "tag";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: {
                    tag: colors.selector,
                    attr: colors.attrKey,
                    string: colors.attrValue
                }[state],
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.字符串 */

        else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.attrValue,
                content: template + strBorder
            });
            template = "";

        }

        /* 3.边界 */

        else if ([":", '{', '}', ";"].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";

            if (nextNValue(1) == '{' || nextNValue(1) == ';') {
                state = 'attr';
            } else if (nextNValue(1) == '}') {
                state = 'tag';
            } else {
                state = 'string';
            }

            i += 1;
        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }
    return shaderArray;
}


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/shader/javascript
/*****************************************************************/
window.__pkg__bundleSrc__['188']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // JS关键字
var keyWords = [
    "abstract", "arguments", "boolean", "break", "byte",
    "case", "catch", "char", "class", "const",
    "continue", "debugger", "default", "delete", "do",
    "double", "else", "enum", "eval", "export",
    "extends", "false", "final", "finally", "float",
    "for", "function", "goto", "if", "implements",
    "import", "in", "instanceof", "int", "interface",
    "let", "long", "native", "new", "null",
    "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized",
    "this", "throw", "throws", "transient", "true",
    "try", "typeof", "var", "void", "volatile",
    "while", "with", "yield"
];

__pkg__scope_bundle__.default= function (textString, colors) {
    var shaderArray = [];

    // 当前面对的
    var i = 0;

    // 获取往后n个值
    var nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = "";

    // 初始化模板，开始文本捕获
    var initTemplate = function () {
        if (template != "") {

            // 考虑开始的(
            if (template[0] == '(') {
                shaderArray.push({
                    color: colors.insign,
                    content: "("
                });
                template = template.substr(1);
            }

            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释1 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.注释2 */

        else if (nextNValue(2) == '//') {
            initTemplate();
            while (nextNValue(1) !== '\n' && i < textString.length) {
                template += textString[i++];
            }
            shaderArray.push({
                color: colors.annotation,
                content: template
            });
            template = "";
        }

        /* 3.字符串 */

        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {

            var strBorder = nextNValue(1);
            initTemplate();

            do {
                template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length)

            // 因为可能是没有字符导致的结束
            if (nextNValue(1) != strBorder) {
                strBorder = "";
            } else {
                i += 1;
            }

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            template = "";

        }


        /* 4.函数定义 */

        else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
            shaderArray.push({
                color: colors.funName,
                content: template
            });
            i += 1;
            template = "(";

        }

        /* 5.方法调用 */

        else if (nextNValue(1) == '(') {

            shaderArray.push({
                color: colors.execName,
                content: template
            });
            i += 1;
            template = "(";
        }

        /* 6.边界 */

        else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!'].indexOf(nextNValue(1)) > -1) {

            initTemplate();
            shaderArray.push({
                color: colors.insign,
                content: nextNValue(1)
            });
            template = "";
            i += 1;
        }

        /* 7.关键字 */

        else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

            shaderArray.push({
                color: colors.key,
                content: template + " "
            });
            template = "";
            i += 1;

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return shaderArray;
}


    return __pkg__scope_bundle__;
}
