
/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/keyboard/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['233']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('399');
var template =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('400');


__pkg__scope_args__=window.__pkg__getBundle('401');
var keyData =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('178');
var getKeyCode =__pkg__scope_args__.default;

__pkg__scope_args__=window.__pkg__getBundle('189');
var preventDefault =__pkg__scope_args__.default;


var cancelListener, isFocus = true, interval;
__pkg__scope_bundle__.default= function (obj, props) {

    return {
        name: "type-practice",
        render: template,
        data: {
            flag: "noBegin",
            time: obj.ref("00:00:00"),
            speed: obj.ref("0字/分"),
            process: obj.ref("0%"),
            rate: obj.ref("100%")
        },
        beforeUnfocus: function () {
            isFocus = false;
        },
        focused: function () {
            isFocus = true;
        },
        beforeDestory: function () {
            cancelListener();
            clearInterval(interval);
        },
        methods: {
            reopen: function () {
                this.$closeDialog();
                this.$openDialog(props.dialogs["keyboard"]);
            }
        },
        mounted: function () {

            // 分别表示间隙、条目1、条目2、条目3、条目4和条目5的宽
            // 其中条目1的宽等于所有条目的高，条目宽依次递增
            var gapW = 5, item1W = 50, item2W = item1W * 1.6;
            var item3W = (2 * item1W + gapW + item2W) * 0.5;
            var item4W = (3 * item1W + 2 * gapW + item2W) * 0.5;
            var item5W = 13 * item1W + 7 * gapW - 5 * item2W;

            // 创建一个键
            var newKeyItem = function (itemContent) {
                var itemWidth = [item1W, item2W, item3W, item4W, item5W][itemContent.level - 1];

                var itemDiv = document.createElement("div");
                itemDiv.setAttribute("class", "key-item");

                itemDiv.style.width = itemWidth + "px";
                itemDiv.style.height = item1W + "px";
                itemDiv.style.marginLeft = gapW + "px";
                itemDiv.style.marginTop = gapW + "px";
                itemDiv.style.paddingTop = item1W * 0.2 + "px";

                if (Array.isArray(itemContent.text)) {
                    itemDiv.innerHTML = itemContent.text[0] + "<br />" + itemContent.text[1];
                    itemDiv.style.lineHeight = item1W * 0.3 + "px";
                } else {
                    itemDiv.innerHTML = itemContent.text;
                    itemDiv.style.lineHeight = item1W * 0.55 + "px";
                }

                return {
                    el: itemDiv,
                    width: itemWidth
                };
            };

            // 创建键盘
            var keyboardEl = this._refs.mykeyboard.value;
            var updateKeyboard = function () {
                keyboardEl.innerHTML = "";

                var left, top = 10;
                for (var i = 0; i < keyData.length; i++) {
                    left = 10;

                    var lineDiv = document.createElement("div");
                    lineDiv.setAttribute("class", "line");
                    keyboardEl.appendChild(lineDiv);

                    for (var j = 0; j < keyData[i].length; j++) {
                        var itemInstance = newKeyItem(keyData[i][j]);
                        lineDiv.appendChild(itemInstance.el);
                        left += itemInstance.width + gapW;

                        keyData[i][j].el = itemInstance.el;

                        if (Array.isArray(keyData[i][j].text)) {
                            keyData[i][j].upperText = [];
                            for (var k = 0; k < keyData[i][j].text.length; k++) {
                                keyData[i][j].upperText.push(keyData[i][j].text[k].toLocaleUpperCase());
                            }
                        } else {
                            keyData[i][j].upperText = keyData[i][j].text.toLocaleUpperCase();
                        }
                    }
                    top += item1W + gapW;
                }

            };
            updateKeyboard();

            // 创建七个需要待敲的
            var willlistEl = this._refs.willlist.value;
            var willlistArray = [];
            var updateWilllist = function () {
                willlistEl.innerHTML = "";
                willlistArray = [];
                var i = 0;
                while (i < 7) {
                    var row = Math.floor(Math.random() * (5 - 0.01));
                    var col = Math.floor(Math.random() * (keyData[row].length + 0.01));

                    // 把部分键排除掉
                    if (

                        // 最后一行
                        row != 4 &&

                        // Shift
                        !(row == 3 && (col == 0 || col == 11)) &&

                        // Caps、Enter
                        !(row == 2 && (col == 0 || col == 12)) &&

                        // Tab
                        !(row == 1 && col == 0) &&

                        // Delete
                        !(row == 0 && col == 13)
                    ) {
                        i += 1;

                        var texts = Array.isArray(keyData[row][col].text) ? keyData[row][col].text : [keyData[row][col].text];
                        var upperText = [];
                        for (var j = 0; j < texts.length; j++) {
                            upperText.push(texts[j].toLocaleUpperCase());
                        }

                        var itemInstance = newKeyItem(keyData[row][col]);
                        willlistEl.appendChild(itemInstance.el);

                        willlistArray.push({
                            upperText: upperText,
                            el: itemInstance.el
                        });
                    }
                }
            };
            updateWilllist();

            // 当前状态、开始时间、已敲个数、正确个数、总个数
            this.flag = 'noBegin'
            var beginTime, count, rightCount, allCount = 1000;

            var current = 0, _this = this;
            var activeEl = null;
            cancelListener = getKeyCode(function (keyCode, event) {
                if (isFocus && _this.flag != "end") {
                    var currentColor = "red";

                    preventDefault(event);
                    var inputValue = keyCode.toUpperCase();

                    // 如果还没有开始
                    if (_this.flag == 'noBegin') {

                        // 标记开始
                        _this.flag = 'Runing';

                        // 初始化参数
                        beginTime = new Date().valueOf();
                        count = 0;
                        rightCount = 0;

                        interval = setInterval(function () {
                            var useTime = new Date().valueOf() - beginTime;

                            var dateInstance = new Date(useTime);
                            var hour = dateInstance.getHours() - 8;
                            var minutes = dateInstance.getMinutes();
                            var seconds = dateInstance.getSeconds();

                            _this.time = (hour > 9 ? "" : "0") + hour + ":" + (minutes > 9 ? "" : "0") + minutes + ":" + (seconds > 9 ? "" : "0") + seconds;
                            _this.speed = (rightCount / (useTime * 0.001) * 60).toFixed(0) + "字/分";
                        }, 1000);
                    }

                    count += 1;
                    for (var i = 0; i < willlistArray[current].upperText.length; i++) {
                        if (willlistArray[current].upperText[i] == inputValue) {
                            willlistArray[current].el.style.outline = "green solid 2px";

                            rightCount += 1;
                            current += 1;
                            currentColor = "green";

                            _this.process = (rightCount / allCount * 100).toFixed(0) + "%";
                            if (current >= willlistArray.length) {
                                updateWilllist();
                                current = 0;
                            }
                            willlistArray[current].el.style.outline = "yellow solid 2px";
                            break;
                        }
                    }
                    _this.rate = (rightCount / count * 100).toFixed(0) + "%";

                    if (rightCount >= allCount) {
                        clearInterval(interval);
                        _this.flag = 'end';
                    }

                    var getCurrentEl = function () {
                        for (var i = 0; i < keyData.length; i++) {
                            for (var j = 0; j < keyData[i].length; j++) {
                                var upperTexts = Array.isArray(keyData[i][j].upperText) ? keyData[i][j].upperText : [keyData[i][j].upperText];
                                for (var k = 0; k < upperTexts.length; k++) {
                                    if (upperTexts[k] == inputValue) {
                                        return keyData[i][j].el;
                                    }
                                }
                            }
                        }
                    };

                    if (activeEl) activeEl.style.outline = "none";
                    activeEl = getCurrentEl();
                    if (activeEl) activeEl.style.outline = "2px solid " + currentColor;
                }
            });

        }
    };
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/keyboard/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['399']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,7]},{"type":"tag","name":"header","attrs":{"ui-dragdrop:desktop":""},"childNodes":[2,4]},{"type":"tag","name":"h2","attrs":{},"childNodes":[3]},{"type":"text","content":"键盘练习","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"win-btns"},"childNodes":[5]},{"type":"tag","name":"button","attrs":{"class":"close","ui-on:click.stop":"$closeDialog"},"childNodes":[6]},{"type":"text","content":"关闭","childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"content"},"childNodes":[8,9,14,15]},{"type":"tag","name":"div","attrs":{"ref":"willlist","ui-bind:active":"flag=='end'?'no':'yes'","class":"willlist topview"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"endinfo topview","ui-bind:active":"flag=='end'?'yes':'no'"},"childNodes":[10,11,13]},{"type":"text","content":"🎉恭喜你，键盘完成练习，你可以","childNodes":[]},{"type":"tag","name":"button","attrs":{"ui-on:click":"reopen"},"childNodes":[12]},{"type":"text","content":"再来一次","childNodes":[]},{"type":"text","content":"哦～","childNodes":[]},{"type":"tag","name":"div","attrs":{"ref":"mykeyboard","class":"mykeyboard"},"childNodes":[]},{"type":"tag","name":"div","attrs":{"class":"info"},"childNodes":[16,19,22,25]},{"type":"tag","name":"span","attrs":{},"childNodes":[17,18]},{"type":"text","content":"时间","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-bind":"time"},"childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[20,21]},{"type":"text","content":"速度","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-bind":"speed"},"childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[23,24]},{"type":"text","content":"进度","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-bind":"process"},"childNodes":[]},{"type":"tag","name":"span","attrs":{},"childNodes":[26,27]},{"type":"text","content":"正确率","childNodes":[]},{"type":"tag","name":"i","attrs":{"ui-bind":"rate"},"childNodes":[]}]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/keyboard/index.scss
/*****************************************************************/
window.__pkg__bundleSrc__['400']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    var styleElement = document.createElement('style');
var head = document.head || document.getElementsByTagName('head')[0];
styleElement.innerHTML = "\n [dialog-view='type-practice'] .content{\n\npadding-top: 10px;\n\n}\n\n [dialog-view='type-practice'] .content>.topview{\n\nheight: 90px;\n\n}\n\n [dialog-view='type-practice'] .content>.topview[active='no']{\n\ndisplay: none;\n\n}\n\n [dialog-view='type-practice'] .content>.topview{\n\nmargin: 20px 100px;\n\nborder-bottom: 1px solid #b2b4b5;\n\n}\n\n [dialog-view='type-practice'] .content>.topview.endinfo{\n\npadding-top: 20px;\n\n}\n\n [dialog-view='type-practice'] .content>.topview.endinfo button{\n\npadding: 5px 10px;\n\nmargin: 5px;\n\nborder-radius: 20px;\n\ncolor: white;\n\nbackground-color: #F44336;\n\noutline: none;\n\nborder: none;\n\ncursor: pointer;\n\n}\n\n [dialog-view='type-practice'] .content>.topview.willlist .key-item{\n\nmargin: 20px 10px;\n\n}\n\n [dialog-view='type-practice'] .content .key-item{\n\ndisplay: inline-block;\n\nbackground-image: url(\"./type-practice/keybg.png\");\n\nbackground-repeat: no-repeat;\n\nbackground-size: 103% 105%;\n\nbackground-position: center center;\n\nborder-radius: 5px;\n\nbox-shadow: 0 0 3px 0px rgb(0 0 0 / 70%);\n\nvertical-align: top;\n\nfont-size: 14px;\n\nfont-weight: 800;\n\nfont-family: monospace;\n\n}\n\n [dialog-view='type-practice'] .content .info{\n\nbackground-color: #d9d9d9;\n\nborder-radius: 15px;\n\nline-height: 35px;\n\nmargin: auto;\n\nbox-shadow: 1px 4px 7px 0px #00000073;\n\nwidth: 700px;\n\nmargin-top: 30px;\n\n}\n\n [dialog-view='type-practice'] .content .info>span{\n\ndisplay: inline-block;\n\nwidth: 120px;\n\nfont-size: 14px;\n\nwhite-space: nowrap;\n\n}\n\n [dialog-view='type-practice'] .content .info>span>i{\n\ncolor: #c87b08;\n\nfont-size: 12px;\n\nfont-style: normal;\n\npadding: 0 5px;\n\nfont-weight: 800;\n\n}\n";
styleElement.setAttribute('type', 'text/css');head.appendChild(styleElement);

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/pages/type-practice/dialogs/keyboard/keyData.json
/*****************************************************************/
window.__pkg__bundleSrc__['401']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [
    [
        {
            "level": "1",
            "text": [
                "~",
                "`"
            ]
        },
        {
            "level": "1",
            "text": [
                "!",
                "1"
            ]
        },
        {
            "level": "1",
            "text": [
                "@",
                "2"
            ]
        },
        {
            "level": "1",
            "text": [
                "#",
                "3"
            ]
        },
        {
            "level": "1",
            "text": [
                "$",
                "4"
            ]
        },
        {
            "level": "1",
            "text": [
                "%",
                "5"
            ]
        },
        {
            "level": "1",
            "text": [
                "^",
                "6"
            ]
        },
        {
            "level": "1",
            "text": [
                "&",
                "7"
            ]
        },
        {
            "level": "1",
            "text": [
                "*",
                "8"
            ]
        },
        {
            "level": "1",
            "text": [
                "(",
                "9"
            ]
        },
        {
            "level": "1",
            "text": [
                ")",
                "0"
            ]
        },
        {
            "level": "1",
            "text": [
                "_",
                "-"
            ]
        },
        {
            "level": "1",
            "text": [
                "+",
                "="
            ]
        },
        {
            "level": "2",
            "text": "delete"
        }
    ],
    [
        {
            "level": "2",
            "text": "Tab"
        },
        {
            "level": "1",
            "text": "Q"
        },
        {
            "level": "1",
            "text": "W"
        },
        {
            "level": "1",
            "text": "E"
        },
        {
            "level": "1",
            "text": "R"
        },
        {
            "level": "1",
            "text": "T"
        },
        {
            "level": "1",
            "text": "Y"
        },
        {
            "level": "1",
            "text": "U"
        },
        {
            "level": "1",
            "text": "I"
        },
        {
            "level": "1",
            "text": "O"
        },
        {
            "level": "1",
            "text": "P"
        },
        {
            "level": "1",
            "text": [
                "{",
                "["
            ]
        },
        {
            "level": "1",
            "text": [
                "}",
                "]"
            ]
        },
        {
            "level": "1",
            "text": [
                "|",
                "\\"
            ]
        }
    ],
    [
        {
            "level": "3",
            "text": "Caps"
        },
        {
            "level": "1",
            "text": "A"
        },
        {
            "level": "1",
            "text": "S"
        },
        {
            "level": "1",
            "text": "D"
        },
        {
            "level": "1",
            "text": "F"
        },
        {
            "level": "1",
            "text": "G"
        },
        {
            "level": "1",
            "text": "H"
        },
        {
            "level": "1",
            "text": "J"
        },
        {
            "level": "1",
            "text": "K"
        },
        {
            "level": "1",
            "text": "L"
        },
        {
            "level": "1",
            "text": [
                ":",
                ";"
            ]
        },
        {
            "level": "1",
            "text": [
                "\"",
                "'"
            ]
        },
        {
            "level": "3",
            "text": "Enter"
        }
    ],
    [
        {
            "level": "4",
            "text": "Shift"
        },
        {
            "level": "1",
            "text": "Z"
        },
        {
            "level": "1",
            "text": "X"
        },
        {
            "level": "1",
            "text": "C"
        },
        {
            "level": "1",
            "text": "V"
        },
        {
            "level": "1",
            "text": "B"
        },
        {
            "level": "1",
            "text": "N"
        },
        {
            "level": "1",
            "text": "M"
        },
        {
            "level": "1",
            "text": [
                "<",
                ","
            ]
        },
        {
            "level": "1",
            "text": [
                ">",
                "."
            ]
        },
        {
            "level": "1",
            "text": [
                "?",
                "/"
            ]
        },
        {
            "level": "4",
            "text": "Shift"
        }
    ],
    [
        {
            "level": "2",
            "text": "Ctrl"
        },
        {
            "level": "2",
            "text": "Win"
        },
        {
            "level": "2",
            "text": "Alt"
        },
        {
            "level": "5",
            "text": "Blank Space"
        },
        {
            "level": "2",
            "text": "Alt"
        },
        {
            "level": "2",
            "text": "Win"
        },
        {
            "level": "2",
            "text": "Ctrl"
        }
    ]
]

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/tool/keyCode
/*****************************************************************/
window.__pkg__bundleSrc__['178']=function(){
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
// Original file:./src/tool/xhtml/preventDefault
/*****************************************************************/
window.__pkg__bundleSrc__['189']=function(){
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
