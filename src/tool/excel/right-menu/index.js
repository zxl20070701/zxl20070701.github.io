import appendTo from '../../xhtml/appendTo';
import find from '../../xhtml/find';
import bind from '../../xhtml/bind';
import stopPropagation from '../../xhtml/stopPropagation';
import { getTargetNode } from '../tool/polyfill';

export default function () {
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