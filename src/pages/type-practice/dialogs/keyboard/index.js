import template from './index.html';
import "./index.scss";

import keyData from './keyData.json';
import getKeyCode from '../../../../tool/keyCode';
import preventDefault from '../../../../tool/xhtml/preventDefault';

var cancelListener, isFocus = true, interval;
export default function (obj, props) {

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