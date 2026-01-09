import find from '../../xhtml/find';
import appendTo from '../../xhtml/appendTo';
import bind from '../../xhtml/bind';
import hasClass from '../../xhtml/hasClass';
import colorTemplate from './color-template';
import { getTargetNode } from '../tool/polyfill';

export default function () {
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
