
/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['70']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('132');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('133');


__pkg__scope_args__=window.__pkg__getBundle('134');
var regexpToJson =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('141');
var drawImage =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('144');
var canvasRender =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('30');
var urlFormat =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    var urlObj = urlFormat();

    return {
        name: "regexper-visualization",
        render: template,
        data: {
            expressVal: obj.ref(decodeURIComponent(urlObj.params.express || "") || "\\w{1,5}[a-e0-8]|4(534)5(35{3}|d)d(?=123)\\1"),
            isString: obj.ref(urlObj.params.isString || "no"),
            uniqueHash: new Date().valueOf()
        },
        beforeFocus: function () {
            document.getElementsByTagName('title')[0].innerText = "正则表达式可视化" + window.systeName;
            document.getElementById('icon-logo').setAttribute('href', './regexper-visualization.png');
        },
        mounted: function () {

            // 调用显示
            this.doDisplay("load");

            this._refs['is-string-' + this.isString].value.setAttribute('checked', 'checked');

        },
        methods: {
            doIsString: function (event, target) {
                this.isString = target.getAttribute('tag');
                this.doDisplay();
            },
            doDisplay: function (flag) {

                // 如果不是初始化打开时候触发的，需要更新地址进行记录
                if (flag != 'load') {
                    window.location.href = "#/regexper-visualization?express=" + encodeURIComponent(this.expressVal) + "&isString=" + this.isString;
                }

                // 求解绘制需要的信息
                var imageData = regexpToJson(this.expressVal, this.isString == 'yes', this._refs.help.value);

                // 画布
                var canvas = this._refs.mycanvas.value;

                // 获取画笔并进行初始化
                var painter = canvasRender(canvas, imageData.width + 60, imageData.height + 20, {}, true).config({
                    textAlign: "center",
                    "fontFamily": "sans-serif"
                });

                // 绘制
                window.group_index = 1;
                drawImage(painter, imageData, 30, 10);

                // 绘制开头和结尾

                painter.beginPath().moveTo(20, imageData.height * 0.5 + 10).lineTo(30, imageData.height * 0.5 + 10).stroke();
                painter.beginPath().moveTo(imageData.width + 40, imageData.height * 0.5 + 10).lineTo(imageData.width + 30, imageData.height * 0.5 + 10).stroke();

                painter.fillCircle(15, imageData.height * 0.5 + 10, 5);
                painter.fillCircle(imageData.width + 45, imageData.height * 0.5 + 10, 5);

            }
        }

    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['132']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,9,10,11,13,19,20]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"正则表达式可视化","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[5,7]},{"type":"tag","name":"button","attrs":{"class":"min","ui-on:click.stop":"$minView"},"childNodes":[6]},{"type":"text","content":"最小化","childNodes":[]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeView"},"childNodes":[8]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"help-hidden","ref":"help"},"childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"text","ui-model":"expressVal"},"childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"doDisplay"},"childNodes":[12]},{"type":"text","content":"显示","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"isString"},"childNodes":[14,15,16,17,18]},{"type":"tag","name":"input","attrs":{"type":"radio","ui-bind:name":"\"isString\"+uniqueHash","ref":"is-string-yes","ui-on:click":"doIsString","tag":"yes"},"childNodes":[]},{"type":"text","content":"是字符串","childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[]},{"type":"tag","name":"input","attrs":{"type":"radio","ui-bind:name":"\"isString\"+uniqueHash","ref":"is-string-no","ui-on:click":"doIsString","tag":"no"},"childNodes":[]},{"type":"text","content":"不是字符串","childNodes":[]},{"type":"tag","name":"hr","attrs":{},"childNodes":[]},{"type":"tag","name":"canvas","attrs":{"ref":"mycanvas"},"childNodes":[21]},{"type":"text","content":"非常抱歉，您的浏览器不支持canvas!","childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['133']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [page-view=\"regexper-visualization\"]{\n\npadding-bottom: 20px;\n\nwidth: 800px;\n\nleft: calc(50vw - 400px);\n\ntop: 50px;\n\n}\n\n [page-view=\"regexper-visualization\"][focus=\"no\"]>header{\n\nbackground-color: #646125;\n\n}\n\n [page-view=\"regexper-visualization\"]>header{\n\ntext-align: left;\n\nline-height: 50px;\n\nbackground-color: #595616;\n\nmargin-bottom: 30px;\n\n}\n\n [page-view=\"regexper-visualization\"]>header>h2{\n\ncolor: #98932e;\n\nfont-size: 20px;\n\npadding-left: 50px;\n\nbackground-image: url(\"./regexper-visualization.png\");\n\nbackground-position: 10px center;\n\nbackground-repeat: no-repeat;\n\nbackground-size: auto 60%;\n\nfont-family: cursive;\n\ndisplay: inline-block;\n\n}\n\n [page-view=\"regexper-visualization\"]>div.help-hidden{\n\nposition: fixed;\n\nfont-size: 12px;\n\nfont-family: sans-serif;\n\npadding: 0;\n\nborder: none;\n\nbottom: -100px;\n\n}\n\n [page-view=\"regexper-visualization\"]{\n\ntext-align: center;\n\n}\n\n [page-view=\"regexper-visualization\"] input[type=\"text\"]{\n\nwidth: 700px;\n\nheight: 30px;\n\npadding: 0 10px;\n\n}\n\n [page-view=\"regexper-visualization\"]>button{\n\nheight: 30px;\n\nmargin-left: 10px;\n\nbackground-color: #97932e;\n\ncolor: #fefefe;\n\ncursor: pointer;\n\n}\n\n [page-view=\"regexper-visualization\"] canvas{\n\nbackground-color: white;\n\n}\n\n [page-view=\"regexper-visualization\"] hr{\n\nmargin: 20px 0;\n\n}\n\n [page-view=\"regexper-visualization\"] .isString{\n\nmargin-top: 10px;\n\nfont-size: 12px;\n\n}\n\n [page-view=\"regexper-visualization\"] .isString input{\n\nvertical-align: sub;\n\n}\n\n [page-view=\"regexper-visualization\"] .isString span{\n\ndisplay: inline-block;\n\nwidth: 20px;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/regexpToJson/index
/*****************************************************************/
window.__pkg__bundleSrc__['134']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('135');
var pretreatment =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('136');
var analyseExpress =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (express, _isString, helpEl) {

    // 预处理
    express = pretreatment(express, _isString);

    // 单词分析
    var expressArray = analyseExpress(express.trim(), helpEl);

    // 补充辅助括号
    expressArray.unshift(["?@"]);
    expressArray.unshift('(');
    expressArray.push(')');

    /**
     * 接下来，我们将进行结构分析，
     * 获取完整的尺寸大小和结点之间的关系
     */
    return (function calcImageData(index) {

        var imageData = {
            width: 0,
            height: 0,

            // 考虑到有的分组需要捕获，有的不记录等，对每个分组添加说明
            // no-group  非分组
            // group 匹配,并捕获文本到自动命名的组里
            // ?: 匹配,不捕获匹配的文本，也不给此分组分配组号
            // ?= 零宽断言，匹配目标的后面是
            // ?! 零宽断言，匹配目标的后面不是
            // ?@ 辅助组
            flag: "no-group",

            // 标记当前组循环次数
            max: 1, min: 1,

            type: "组",

            // 记录并列的一列列内容
            contents: []
        };

        // 判断分组标志
        if (expressArray[index] == '(') {
            imageData.flag = 'group';
            index += 1;
        }

        // 表示一行（一个组可以有并列的多行）
        var rowObject = {
            contents: [],
            width: 0,
            height: 0
        }, i;

        for (i = index; i < expressArray.length; i++) {

            // 说明开始一个新的匹配分组
            if (expressArray[i] == '(') {
                var _imageData = calcImageData(i);
                rowObject.contents.push(_imageData[0]);

                // 更新大小
                rowObject.width += _imageData[0].width;
                if (rowObject.height < _imageData[0].height) rowObject.height = _imageData[0].height;

                i = _imageData[1];
            }

            // 分组匹配结束，返回
            else if (expressArray[i] == ')') {

                if (expressArray[i + 1] && expressArray[i + 1].type == "分组循环") {
                    imageData.max = expressArray[i + 1].max;
                    imageData.min = expressArray[i + 1].min;
                    i++;
                }

                break;
            }

            // 需要换行（新的行）
            else if (expressArray[i] == '|') {
                imageData.contents.push(rowObject);

                // 更新大小
                if (rowObject.width > imageData.width) imageData.width = rowObject.width;
                imageData.height += rowObject.height;

                //  重置数据
                rowObject = {
                    contents: [],
                    width: 0,
                    height: 0
                };

            }

            else {

                for (var j = 0; j < expressArray[i].length; j++) {

                    // 如果是分组标记
                    if (j == 0 && ['?=', '?!', '?:', '?@'].indexOf(expressArray[i][0]) > -1) {
                        imageData.flag = expressArray[i][0];
                    }

                    // 否则就是普通的条目
                    else {

                        rowObject.contents.push(expressArray[i][j]);

                        // 更新大小
                        rowObject.width += expressArray[i][j].width;
                        if (rowObject.height < expressArray[i][j].height) rowObject.height = expressArray[i][j].height;
                    }
                }

            }

        }

        if (rowObject.contents.length > 0) imageData.contents.push(rowObject);

        // 更新大小
        if (rowObject.width > imageData.width) imageData.width = rowObject.width;
        imageData.height += rowObject.height;

        return [imageData, i];
    })(0)[0];
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/regexpToJson/pretreatment
/*****************************************************************/
window.__pkg__bundleSrc__['135']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 预处理的任务就是把不同可能的输入统一成一样的格式，
// 这样的好处是后续判断的时候可以在一个比较小的集合里面考虑

__pkg__scope_bundle__.default= function (express, _isString) {

    if (_isString) {
        var _express = "";
        for (var i = 0; i < express.length; i++) {
            if (express[i] == '\\') {
                if (i + 1 < express.length) _express += express[i + 1];
                i += 1;
            } else {
                _express += express[i];
            }
        }
        express = _express;
    } else {

        if (/^\//.test(express) && /\/$/.test(express)) {
            express = express.replace(/^\//, '').replace(/\/$/, '');
        }
    }

    return express;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/regexpToJson/analyseExpress
/*****************************************************************/
window.__pkg__bundleSrc__['136']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('137');
var ReadString =__pkg__scope_args__.default;


// 特殊字符处理
__pkg__scope_args__=window.__pkg__getBundle('138');
var specialWord =__pkg__scope_args__.default;


// 范围分析
__pkg__scope_args__=window.__pkg__getBundle('139');
var analysePurview =__pkg__scope_args__.default;


// 用于辅助计算内容宽
__pkg__scope_args__=window.__pkg__getBundle('140');
var calcWidth =__pkg__scope_args__.default;


// 对表达式进行结构分析

__pkg__scope_bundle__.default= function (express, helpEl) {

    // 生成字符串分析辅助对象
    var reader = ReadString(express);

    // 读取第一个字符后准备分析
    reader.readNext();

    var expressArray = [], temp;

    while (true) {

        // 如果还有字符，分析继续
        if (reader.index >= express.length) break;

        // 如果遇到边界字符，截断
        if (reader.currentChar == ')' || reader.currentChar == '(' || reader.currentChar == '|') {
            expressArray.push(reader.currentChar);
            reader.readNext();
        }

        // 否则就是一段内容
        else {

            // 内容按照最小单元分割
            var subExpressArray = [];
            var tempContent = "";

            var pushContentItem = function (isSpecialFlag) {
                if (tempContent != "") {

                    var tempContentArray;
                    if (isSpecialFlag && tempContent.length > 1) {
                        tempContentArray = [
                            tempContent.substring(0, tempContent.length - 1),
                            tempContent[tempContent.length - 1]
                        ];
                    } else {
                        tempContentArray = [tempContent];
                    }

                    for (var _index = 0; _index < tempContentArray.length; _index++) {
                        subExpressArray.push({
                            content: tempContentArray[_index],
                            type: '内容',
                            max: 1,
                            min: 1,
                            height: 44,
                            width: calcWidth(tempContentArray[_index], helpEl) + 30
                        });
                    }

                    tempContent = "";
                }
            };

            while (reader.index < express.length) {

                // 如果遇到边界字符，当前段内容分析完毕
                if (reader.currentChar == ')' || reader.currentChar == '(' || reader.currentChar == '|') {
                    pushContentItem();
                    break;
                } else {

                    // 转义
                    if (reader.currentChar == '\\') {
                        pushContentItem();

                        if (reader.getNextN(2) == '\\x') {
                            temp = specialWord(reader.getNextN(4));
                            reader.readNext(); reader.readNext(); reader.readNext(); reader.readNext();
                        } else {
                            temp = specialWord(reader.getNextN(2));
                            reader.readNext(); reader.readNext();
                        }

                        subExpressArray.push({
                            content: temp[0],
                            type: temp[1],
                            max: 1,
                            min: 1,
                            width: calcWidth(temp[0], helpEl) + 30,
                            height: 44
                        });
                    }

                    // 备选
                    else if (reader.currentChar == '[') {
                        pushContentItem();
                        temp = "";
                        while (reader.currentChar != ']') {
                            temp += reader.currentChar;
                            reader.readNext();
                        }
                        temp = analysePurview(temp.replace(/^\[/, ''), helpEl);
                        subExpressArray.push({
                            content: temp[0],
                            type: "范围",
                            max: 1,
                            min: 1,
                            width: temp[1] + 20, // 5+X+4+4+4+X+5  +20
                            height: temp[0].length * 28 + 26 // 5+24+4+24+4+...+5  +20
                        });
                        reader.readNext();
                    }

                    // 如果是分组的特殊说明符号
                    else if (
                        reader.currentChar == '?' &&
                        ['?=', '?!', '?:'].indexOf(reader.getNextN(2)) > -1 &&
                        expressArray[expressArray.length - 1] == '(' &&
                        subExpressArray.length == 0
                    ) {
                        pushContentItem();
                        subExpressArray.push(reader.getNextN(2));
                        reader.readNext(); reader.readNext();
                    }

                    // 范围
                    // 对于范围而言，它应该是和前面一个内容单元为一组
                    else if (['{', '*', '?', '+'].indexOf(reader.currentChar) > -1) {
                        pushContentItem(true);

                        temp = [];

                        // {}
                        if (reader.currentChar == '{') {

                            while (reader.currentChar != '}') {
                                temp += reader.currentChar;
                                reader.readNext();
                            }

                            temp = temp.replace(/^\{/, '').split(',');

                            // 最小值
                            if (temp[0].trim() == '') {
                                temp[0] = -1;
                            } else {
                                temp[0] = +temp[0];
                            }

                            // 最大值
                            if (temp.length <= 1) {
                                temp[1] = temp[0];
                            } else if (temp[1].trim() == '') {
                                temp[1] = -1;
                            } else {
                                temp[1] = +temp[1];
                            }

                        }

                        //  + * ？
                        else {

                            temp = {
                                "+": [1, -1],
                                "*": [0, -1],
                                "?": [0, 1]
                            }[reader.currentChar];

                        }

                        // 如果是标记分组循环次数的
                        if (subExpressArray.length == 0) {
                            expressArray.push({
                                type: "分组循环",
                                max: temp[1],
                                min: temp[0]
                            });
                        }

                        // 否则就是普通的
                        else {
                            subExpressArray[subExpressArray.length - 1].min = temp[0];
                            subExpressArray[subExpressArray.length - 1].max = temp[1];
                        }

                        reader.readNext();

                    }

                    // 否则就是普通的常量了
                    else {

                        if (reader.currentChar == '.') {
                            pushContentItem();
                            subExpressArray.push({
                                content: "任意字符",
                                type: '描述',
                                max: 1,
                                min: 1,
                                height: 44,
                                width: calcWidth('任意字符', helpEl) + 30
                            });
                        } else {
                            tempContent += reader.currentChar;
                        }

                        reader.readNext();
                    }
                }

            }
            pushContentItem();
            expressArray.push(subExpressArray);

        }

    }

    return expressArray;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/ReadString
/*****************************************************************/
window.__pkg__bundleSrc__['137']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (express) {

    var reader = {
        index: -1,
        currentChar: null
    };

    // 读取下一个字符
    reader.readNext = function () {
        reader.currentChar = reader.index++ < express.length - 1 ? express[reader.index] : null;
        return reader.currentChar;
    };

    // 获取往后num个值
    reader.getNextN = function (num) {
        return express.substring(reader.index, num + reader.index > express.length ? express.length : num + reader.index);
    };

    return reader;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/regexpToJson/specialWord
/*****************************************************************/
window.__pkg__bundleSrc__['138']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (word) {

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


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/regexpToJson/analysePurview
/*****************************************************************/
window.__pkg__bundleSrc__['139']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
__pkg__scope_args__=window.__pkg__getBundle('138');
var specialWord =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('140');
var calcWidth =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (_express, helpEl) {

    var express = [];
    for (var i = 0; i < _express.length; i++) {
        if (_express[i] == '\\') {
            if (_express[i + 1] == 'x') {
                express.push("\\x" + _express[i + 2] + _express[i + 3]);
                i += 3;
            } else {
                express.push("\\" + _express[i + 1]);
                i += 1;
            }
        } else {
            express.push(_express[i]);
        }
    }

    var purviews = [], width = 0;
    for (var i = 0; i < express.length; i++) {
        if (express[i + 1] == '-') {

            var temp1 = specialWord(express[i]);
            var temp2 = specialWord(express[i + 2]);

            var width1 = calcWidth(temp1[0], helpEl) + 10;
            var width2 = calcWidth(temp2[0], helpEl) + 10;

            purviews.push([

                {
                    content: temp1[0],
                    type: temp1[1],
                    max: 1,
                    min: 1,
                    width: width1,
                    height: 24
                },
                {
                    content: temp2[0],
                    type: temp2[1],
                    max: 1,
                    min: 1,
                    width: width2,
                    height: 24
                }
            ]);
            i += 2;

            var width3 = width1 > width2 ? width1 : width2;

            if (12 + width3 * 2 > width) width = 12 + width3 * 2;

        } else {

            var temp1 = specialWord(express[i]);

            var width1 = calcWidth(temp1[0], helpEl) + 10;

            purviews.push({
                content: temp1[0],
                type: temp1[1],
                max: 1,
                min: 1,
                width: width1,
                height: 24
            });

            if (width1 > width) width = width1;
        }
    }

    return [purviews, width + 10];
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/regexpToJson/calcWidth
/*****************************************************************/
window.__pkg__bundleSrc__['140']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 主要用于计算文字的宽

__pkg__scope_bundle__.default= function (texts, helpEl) {
    helpEl.innerText = texts;
    var width = helpEl.clientWidth;
    return width < 14 ? 14 : width;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/drawImage/index
/*****************************************************************/
window.__pkg__bundleSrc__['141']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('142');
var drawNode =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('143');
var toLoopText =__pkg__scope_args__.default;


var normalConfig = {
    'strokeStyle': '#000000',
    'lineDash': [],
    'lineWidth': 2,
    "fontSize": 12
};

__pkg__scope_bundle__.default= function drawImage(painter, imageData, left, top) {

    // 绘制组标记
    if (imageData.flag != "no-group" && imageData.flag != '?@') {

        painter.config({
            'strokeStyle': 'red',
            'lineDash': [2],
            'lineWidth': 1,
            'fontSize': 10
        })
            .strokeRect(left + 5, top + 5, imageData.width - 10, imageData.height - 10)

            // 提示文字
            .fillText({
                "?:": "仅匹配",
                "?!": "匹配否",
                "?=": "匹配是",
                "group": "#" + (window.group_index++)
            }[imageData.flag], left + imageData.width * 0.5, top);

        // 绘制循环次数
        if (imageData.min != 1 || imageData.max != 1) {

            painter.fillText(
                toLoopText(imageData.min, imageData.max),
                left + imageData.width * 0.5, top + imageData.height
            );

        }
    }

    // 统一配置画笔
    painter.config(normalConfig);

    if (imageData.contents.length > 1) {

        // 绘制并列行的前后连线

        painter
            .config({
                lineWidth: 2
            })
            .beginPath()
            .moveTo(left, top + imageData.contents[0].height * 0.5)
            .lineTo(left, top + imageData.contents[0].height * 0.5 + imageData.height - imageData.contents[imageData.contents.length - 1].height * 0.5 - imageData.contents[0].height * 0.5)
            .stroke()
            .beginPath()
            .moveTo(left + imageData.width, top + imageData.contents[0].height * 0.5)
            .lineTo(left + imageData.width, top + imageData.contents[0].height * 0.5 + imageData.height - imageData.contents[imageData.contents.length - 1].height * 0.5 - imageData.contents[0].height * 0.5)
            .stroke();
    }

    // 绘制一行行的
    var _top = top;
    for (var rowNum = 0; rowNum < imageData.contents.length; rowNum++) {

        var _helpWidth = (imageData.width - imageData.contents[rowNum].width) * 0.5;

        // 绘制一列列的
        var _left = left;
        for (var colNum = 0; colNum < imageData.contents[rowNum].contents.length; colNum++) {

            var colItem = imageData.contents[rowNum].contents[colNum];
            var _helpHeight = (imageData.contents[rowNum].height - colItem.height) * 0.5;

            // 绘制开头和结尾的

            var _helpDist = (colItem.type == '组' && colItem.contents.length != 1) ? 0 : 10;

            painter
                .config({
                    lineWidth: 2
                })
                .beginPath()
                .moveTo(
                    colNum == 0 ?
                        _left
                        :
                        _left + _helpWidth, _top + _helpHeight + colItem.height * 0.5)
                .lineTo(_left + _helpWidth + _helpDist, _top + _helpHeight + colItem.height * 0.5)
                .stroke()
                .beginPath()
                .moveTo(
                    colNum == imageData.contents[rowNum].contents.length - 1 ?
                        left + imageData.width
                        :
                        _left + _helpWidth + colItem.width, _top + _helpHeight + colItem.height * 0.5)
                .lineTo(_left + _helpWidth + colItem.width - _helpDist, _top + _helpHeight + colItem.height * 0.5)
                .stroke();


            // 组
            if (colItem.type == '组') {
                drawImage(painter, colItem, _left + _helpWidth, _top + _helpHeight);
            }

            // 否则就是需要进行实际绘制的了
            else {

                // 绘制循环次数
                if (colItem.min != 1 || colItem.max != 1) {

                    var purview = toLoopText(colItem.min, colItem.max);

                    painter.config({
                        'fillStyle': 'gray',
                        'fontSize': 10
                    })
                        // 提示文字
                        .fillText(purview, _left + _helpWidth + colItem.width * 0.5, _top + colItem.height + _helpHeight - 5);

                    // 统一配置画笔
                    painter.config(normalConfig);
                }

                if (colItem.type == '内容') {

                    drawNode(painter, _left + 10 + _helpWidth, _top + 10 + _helpHeight, colItem.width - 20, colItem.height - 20, '#dae9e5', colItem.content);

                } else if (colItem.type == '描述') {

                    drawNode(painter, _left + 10 + _helpWidth, _top + 10 + _helpHeight, colItem.width - 20, colItem.height - 20, '#bada55', colItem.content);

                } else if (colItem.type == '范围') {

                    // 先绘制最后的背景
                    painter
                        .config('fillStyle', '#cbcbba')
                        .fillRect(_left + 10 + _helpWidth, _top + 10 + _helpHeight, colItem.width - 20, colItem.height - 20);

                    for (var k = 0; k < colItem.content.length; k++) {
                        if (Array.isArray(colItem.content[k])) {

                            drawNode(painter, _left + colItem.width * 0.5 + _helpWidth - 6 - colItem.content[k][0].width, _top + 15 + 28 * k + _helpHeight, colItem.content[k][0].width, 24, {
                                "内容": '#dae9e5',
                                "描述": "#bada55"
                            }[colItem.content[k][0].type], colItem.content[k][0].content);
                            drawNode(painter, _left + colItem.width * 0.5 + 6 + _helpWidth, _top + 15 + 28 * k + _helpHeight, colItem.content[k][1].width, 24, {
                                "内容": '#dae9e5',
                                "描述": "#bada55"
                            }[colItem.content[k][1].type], colItem.content[k][1].content);

                            // 画线条
                            painter
                                .beginPath()
                                .moveTo(_left + colItem.width * 0.5 - 2 + _helpWidth, _top + 27 + 28 * k + _helpHeight)
                                .lineTo(_left + colItem.width * 0.5 + 2 + _helpWidth, _top + 27 + 28 * k + _helpHeight)
                                .stroke();

                        } else {

                            if (k == 0 && colItem.content[0].content == '^') {

                                drawNode(painter, _left + _helpWidth + colItem.width * 0.5 - colItem.content[k].width * 0.5, _top + 15 + 28 * k + _helpHeight, colItem.content[k].width, 24, "#cbcbba", "非下列", 'white');

                            } else {

                                drawNode(painter, _left + _helpWidth + colItem.width * 0.5 - colItem.content[k].width * 0.5, _top + 15 + 28 * k + _helpHeight, colItem.content[k].width, 24, {
                                    "内容": '#dae9e5',
                                    "描述": "#bada55"
                                }[colItem.content[k].type], colItem.content[k].content);

                            }

                        }
                    }

                } else {
                    throw new Error('发生了未期待的情况\n' + JSON.stringify(colItem, null, 4));
                }

            }


            // 右移
            _left += colItem.width;

        }

        // 换行
        _top += imageData.contents[rowNum].height;
    }

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/drawImage/drawNode
/*****************************************************************/
window.__pkg__bundleSrc__['142']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (painter, x, y, width, height, color, content, textColor) {

    // 先绘制背景
    painter
        .config('fillStyle', color)
        .fillRect(x, y, width, height)

        // 再绘制内容
        .config('fillStyle', textColor || '#000')
        .fillText(content, x + width * 0.5, y + height * 0.5);

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/regexper-visualization/drawImage/toLoopText
/*****************************************************************/
window.__pkg__bundleSrc__['143']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= function (min, max) {

    var purview = "";
    if (min == -1) purview = '<=' + max;
    else if (max == -1) purview = '>=' + min;
    else if (min == max) purview = min + "次";
    else purview = min + " ~ " + max;

    return purview;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/index
/*****************************************************************/
window.__pkg__bundleSrc__['144']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('145');
var initText=__pkg__scope_args__.initText;
var initArc=__pkg__scope_args__.initArc;
var initCircle=__pkg__scope_args__.initCircle;
var initRect=__pkg__scope_args__.initRect;

__pkg__scope_args__=window.__pkg__getBundle('147');
var linearGradient=__pkg__scope_args__.linearGradient;
var radialGradient=__pkg__scope_args__.radialGradient;

__pkg__scope_args__=window.__pkg__getBundle('145');
var initPainterConfig=__pkg__scope_args__.initPainterConfig;


// 画笔对象

__pkg__scope_bundle__.default= function (canvas, width, height, opts, isScale) {

    // 设置宽
    if (width) {
        canvas.style.width = width + "px";
        canvas.setAttribute('width', (isScale ? 2 : 1) * width);
    }

    // 设置高
    if (height) {
        canvas.style.height = height + "px";
        canvas.setAttribute('height', (isScale ? 2 : 1) * height);
    }

    var painter = canvas.getContext("2d", opts || {});
    if (isScale) painter.scale(2, 2);

    // 默认配置canvas2D对象已经存在的属性
    painter.textBaseline = 'middle';
    painter.textAlign = 'left';

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    var config = {

        // 文字大小
        "fontSize": 16,

        // 字体
        "fontFamily": "sans-serif",

        // 字重
        "fontWeight": 400,

        // 字类型
        "fontStyle": "normal",

        // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
        "arcStartCap": 'butt',

        // 圆弧结束端闭合方式，和上一个类似
        "arcWndCap": 'butt',
    };

    // 配置生效方法
    var useConfig = function (key, value) {

        /**
         * -----------------------------
         * 特殊的设置开始
         * -----------------------------
         */

        if (key == 'lineDash') {
            if (painter.setLineDash) painter.setLineDash(value);
        }

        /**
         * -----------------------------
         * 常规的配置开始
         * -----------------------------
         */

        // 如果已经存在默认配置中，说明只需要缓存起来即可
        else if (key in config) {
            config[key] = value;
        }

        // 其它情况直接生效即可
        else if (key in initPainterConfig) {
            painter[key] = value;
        }

        // 如果属性未被定义
        else {
            throw new Error('Illegal configuration item of painter : ' + key + " !");
        }
    };

    // 画笔
    var enhancePainter = {
        __only__painter__: true,

        // 原生画笔
        painter: painter,

        // 属性设置或获取
        "config": function () {
            if (arguments.length === 1) {
                if (typeof arguments[0] !== 'object') {

                    // 暂存的
                    if (arguments[0] in config) return config[arguments[0]];

                    // lineDash
                    if ('lineDash' == arguments[0]) return painter.getLineDash();

                    // 普通的
                    return painter[arguments[0]];
                }
                for (var key in arguments[0]) {
                    useConfig(key, arguments[0][key]);
                }
            } else if (arguments.length === 2) {
                useConfig(arguments[0], arguments[1]);
            }
            return enhancePainter;
        },

        // 文字
        "fillText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).fillText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "strokeText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0).strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },
        "fullText": function (text, x, y, deg) {
            painter.save();
            initText(painter, config, x, y, deg || 0);
            painter.fillText(text, 0, 0);
            painter.strokeText(text, 0, 0);
            painter.restore();
            return enhancePainter;
        },

        // 路径
        "beginPath": function () { painter.beginPath(); return enhancePainter; },
        "closePath": function () { painter.closePath(); return enhancePainter; },
        "moveTo": function (x, y) {

            // 解决1px模糊问题，别的地方类似原因
            painter.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5);
            return enhancePainter;
        },
        "lineTo": function (x, y) { painter.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5); return enhancePainter; },
        "arc": function (x, y, r, beginDeg, deg) {
            painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0);
            return enhancePainter;
        },
        "fill": function () { painter.fill(); return enhancePainter; },
        "stroke": function () { painter.stroke(); return enhancePainter; },
        "full": function () { painter.fill(); painter.stroke(); return enhancePainter; },

        "save": function () { painter.save(); return enhancePainter; },
        "restore": function () { painter.restore(); return enhancePainter; },

        // 路径 - 贝塞尔曲线
        "quadraticCurveTo": function (cpx, cpy, x, y) {
            painter.quadraticCurveTo(cpx, cpy, x, y); return enhancePainter;
        },
        "bezierCurveTo": function (cp1x, cp1y, cp2x, cp2y, x, y) {
            painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y); return enhancePainter;
        },

        // 擦除画面
        "clearRect": function (x, y, w, h) { painter.clearRect(x, y, w, h); return enhancePainter; },
        "clearCircle": function (cx, cy, r) {
            painter.beginPath();
            painter.globalCompositeOperation = "destination-out";
            painter.arc(cx, cy, r, 0, Math.PI * 2); // 绘制圆形
            painter.fill(); // 填充圆形，这将会清除这个圆形区域
            painter.globalCompositeOperation = "source-over";
            painter.closePath();
            return enhancePainter;
        },

        // 弧
        "fillArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).fill(); return enhancePainter;
        },
        "strokeArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg).stroke(); return enhancePainter;
        },
        "fullArc": function (cx, cy, r1, r2, beginDeg, deg) {
            initArc(painter, config, cx, cy, r1, r2, beginDeg, deg);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 圆形
        "fillCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).fill(); return enhancePainter;
        },
        "strokeCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r).stroke(); return enhancePainter;
        },
        "fullCircle": function (cx, cy, r) {
            initCircle(painter, cx, cy, r);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // 矩形
        "fillRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).fill(); return enhancePainter;
        },
        "strokeRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height).stroke(); return enhancePainter;
        },
        "fullRect": function (x, y, width, height) {
            initRect(painter, x, y, width, height);
            painter.fill();
            painter.stroke();
            return enhancePainter;
        },

        // base64
        "toDataURL": function (type) {
            type = type || 'image/png';
            return canvas.toDataURL(type);
        },

        // 获取指定位置颜色
        "getColor": function (x, y) {
            var currentRGBA = painter.getImageData(x - 0.5, y - 0.5, 1, 1).data;
            return "rgba(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + "," + currentRGBA[3] + ")";
        },

        // image
        "drawImage": function (img, sx, sy, sw, sh, x, y, w, h) {
            sx = sx || 0;
            sy = sy || 0;
            x = x || 0;
            y = y || 0;
            w = w ? w : canvas.getAttribute('width');
            h = h ? h : canvas.getAttribute('height');

            if (img.nodeName == 'CANVAS') {
                sw = sw ? sw : canvas.getAttribute('width');
                sh = sh ? sh : canvas.getAttribute('height');
            } else {
                // 默认类型是图片
                sw = sw || img.width;
                sh = sh || img.height;
            }

            painter.drawImage(img, sx, sy, sw, sh, x, y, w, h);
            return enhancePainter;
        },

        /**
        * 渐变
        * -------------
        */

        //  线性渐变
        "createLinearGradient": function (x0, y0, x1, y1) {
            return linearGradient(painter, x0, y0, x1, y1);
        },

        // 环形渐变
        "createRadialGradient": function (cx, cy, r1, r2) {
            if (arguments.length < 4) {
                return radialGradient(painter, cx, cy, 0, r1);
            } else {
                return radialGradient(painter, cx, cy, r1, r2);
            }

        }

    };

    return enhancePainter;

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/config
/*****************************************************************/
window.__pkg__bundleSrc__['145']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('146');
var arc =__pkg__scope_args__.default;


__pkg__scope_bundle__.initPainterConfig = {

    // 填充色或图案
    "fillStyle": 'black',

    // 轮廓色或图案
    "strokeStyle": 'black',

    // 线的端点类型，（"butt"平直边缘、"round"半圆和"square"矩形）
    "lineCap": "butt",

    // 线的拐角连接方式，（"miter"连接处边缘延长相接、"bevel"对角线斜角和"round"圆）
    "lineJoin": "miter",

    // 线条宽度(单位px，下同)
    "lineWidth": 1,

    // 设置线条虚线，应该是一个数组[number,...]
    "lineDash": [],

    // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
    "textAlign": 'left',

    // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
    "textBaseline": 'middle',

    // 阴影的模糊系数，默认0，也就是无阴影
    "shadowBlur": 0,

    // 阴影的颜色
    "shadowColor": "black"

};

// 文字统一设置方法
__pkg__scope_bundle__.initText = function (painter, config, x, y, deg) {

    painter.beginPath();
    painter.translate(x, y);
    painter.rotate(deg);
    painter.font = config.fontStyle + " " + config.fontWeight + " " + config.fontSize + "px " + config.fontFamily;
    return painter;
};

// 画弧统一设置方法
__pkg__scope_bundle__.initArc = function (painter, config, cx, cy, r1, r2, beginDeg, deg) {

    if (r1 > r2) {
        var temp = r1;
        r1 = r2;
        r2 = temp;
    }

    beginDeg = beginDeg % (Math.PI * 2);

    // 当|deg|>=2π的时候都认为是一个圆环
    // 为什么不取2π比较，是怕部分浏览器浮点不精确
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 2;
    } else {
        deg = deg % (Math.PI * 2);
    }

    arc(beginDeg, deg, cx, cy, r1, r2, function (
        beginA, endA,
        begInnerX, begInnerY,
        begOuterX, begOuterY,
        endInnerX, endInnerY,
        endOuterX, endOuterY,
        r
    ) {
        if (r < 0) r = -r;
        painter.beginPath();
        painter.moveTo(begInnerX, begInnerY);
        painter.arc(
            // (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
            cx, cy, r1, beginA, endA, false);
        // 结尾
        if (config.arcEndCap != 'round')
            painter.lineTo(endOuterX, endOuterY);
        else
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
        painter.arc(cx, cy, r2, endA, beginA, true);
        // 开头
        if (config.arcStartCap != 'round')
            painter.lineTo(begInnerX, begInnerY);
        else
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
    });
    if (config.arcStartCap == 'butt') painter.closePath();
    return painter;
};

// 画圆统一设置方法
__pkg__scope_bundle__.initCircle = function (painter, cx, cy, r) {
    painter.beginPath();
    painter.moveTo(cx + r, cy);
    painter.arc(cx, cy, r, 0, Math.PI * 2);
    return painter;
};

// 画矩形统一设置方法
__pkg__scope_bundle__.initRect = function (painter, x, y, width, height) {
    painter.beginPath();
    painter.rect(x, y, width, height);
    return painter;
};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/arc
/*****************************************************************/
window.__pkg__bundleSrc__['146']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    
// 点（x,y）围绕中心（cx,cy）旋转deg度

var rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

// r1和r2，内半径和外半径
// beginA起点弧度，rotateA旋转弧度式

__pkg__scope_bundle__.default= function (beginA, rotateA, cx, cy, r1, r2, doback) {

    // 保证逆时针也是可以的
    if (rotateA < 0) {
        beginA += rotateA;
        rotateA *= -1;
    }

    var temp = [], p;

    // 内部
    p = rotate(0, 0, beginA, r1, 0);
    temp[0] = p[0];
    temp[1] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[2] = p[0];
    temp[3] = p[1];

    // 外部
    p = rotate(0, 0, beginA, r2, 0);
    temp[4] = p[0];
    temp[5] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[6] = p[0];
    temp[7] = p[1];

    doback(
        beginA, beginA + rotateA,
        temp[0] + cx, temp[1] + cy,
        temp[4] + cx, temp[5] + cy,
        temp[2] + cx, temp[3] + cy,
        temp[6] + cx, temp[7] + cy,
        (r2 - r1) * 0.5
    );

};


    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/canvas/Gradient
/*****************************************************************/
window.__pkg__bundleSrc__['147']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    // 线性渐变
__pkg__scope_bundle__.linearGradient = function (painter, x0, y0, x1, y1) {
    var gradient = painter.createLinearGradient(x0, y0, x1, y1);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};

// 环形渐变
__pkg__scope_bundle__.radialGradient = function (painter, cx, cy, r1, r2) {
    var gradient = painter.createRadialGradient(cx, cy, r1, cx, cy, r2);
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "addColorStop": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};


    return __pkg__scope_bundle__;
}
