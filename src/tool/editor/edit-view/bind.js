import { getKeyString } from '../../keyCode';
import isFunction from '../../type/isFunction';
import bind from '../../xhtml/bind';
import mousePosition from '../../xhtml/mousePosition';
import copy from '../../xhtml/copy';
import stopPropagation from '../../xhtml/stopPropagation';
import preventDefault from '../../xhtml/preventDefault';
import { getInputMessage } from './tool';

// 绑定键盘和鼠标等交互事件处理

export default function () {
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