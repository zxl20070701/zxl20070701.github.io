import isElement from '../type/isElement';
import bind from '../xhtml/bind';

// 核心方法和工具方法

import { initDom, initView, initTableView, itemClickHandler, itemInputHandler, itemMoveHandler } from './excel-view/init';
import { formatContent, calcColName, styleToString, newItemData, getLeftTop } from './excel-view/tool';

import style from './tool/style';

import { moveCursorTo } from './excel-view/cursor';
import { setItemStyle } from './excel-view/modify';
import { calcRegionInfo, showRegion, cancelRegion } from './excel-view/region';

// 键盘交互总控

import renderKeyboard from './Keyboard';

// 挂载顶部菜单

import menu from './menu/index';
import updateMenu from './menu/update';
import menuHandler from './menu/menu-handler';

import { insertUp, insertDown, insertLeft, insertRight } from './menu/insert';
import { deleteRow, deleteCol } from './menu/delete';

// 挂载右键菜单

import rightMenu from './right-menu/index';

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

export default Excel;
