
import trigger from '../xhtml/trigger';
import copy from '../xhtml/copy';

import isElement from '../type/isElement';
import isString from '../type/isString';
import isFunction from '../type/isFunction';

// 核心方法和工具方法

import { textWidth, bestLeftNum, calcCanvasXY, selectIsNotBlank, toTemplate } from './edit-view/tool';

import { initDom, initView } from './edit-view/init';
import { updateView, updateSelectView, updateCursorPosition, updateCanvasSize, cancelSelect, deleteSelect } from './edit-view/update';
import bindEvent from './edit-view/bind';
import diff from './edit-view/diff';

import filterText from './edit-view/filter';

// 内置着色器方法

import innerShader from '../shader/index';

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

export default editor;
