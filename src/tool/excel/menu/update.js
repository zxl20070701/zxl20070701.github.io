import find from '../../xhtml/find';
import addClass from '../../xhtml/addClass';
import removeClass from '../../xhtml/removeClass';

export default function (style) {

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
