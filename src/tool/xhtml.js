import isFunction from './type/isFunction';
import isElement from './type/isElement';

export default {

    // 阻止冒泡
    "stopPropagation": function (event) {
        event = event || window.event;
        if (event.stopPropagation) { //这是其他非IE浏览器
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    // 阻止默认事件
    "preventDefault": function (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    // 获取样式
    "getStyle": function (dom, name) {
        // 获取结点的全部样式
        var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
            document.defaultView.getComputedStyle(dom, null) :
            dom.currentStyle;

        // 如果没有指定属性名称，返回全部样式
        return typeof name === 'string' ?
            allStyle.getPropertyValue(name) :
            allStyle;
    },

    // 绑定事件
    "bind": function (dom, eventType, callback) {

        if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
            for (var i = 0; i < dom.length; i++) {
                this.bind(dom[i], eventType, callback);
            }
            return;
        }

        if (window.attachEvent)
            dom.attachEvent("on" + eventType, callback);
        else
            dom.addEventListener(eventType, callback, false);
    },

    // 去掉绑定事件
    "unbind": function (dom, eventType, handler) {

        if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
            for (var i = 0; i < dom.length; i++) {
                this.unbind(dom[i], eventType, handler);
            }
            return;
        }

        if (window.detachEvent)
            dom.detachEvent('on' + eventType, handler);
        else
            dom.removeEventListener(eventType, handler, false);

    },

    // 触发事件
    "trigger": function (dom, eventType) {
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

    },

    // 变成结点
    "toNode": function (template) {
        var frame = document.createElement("div");
        frame.innerHTML = template;
        var childNodes = frame.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (isElement(childNodes[i])) return childNodes[i];
        }
        return null;
    },

    // 追加结点(内部结尾)
    "appendTo": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.appendChild(node);
        return node;
    },

    // 追加结点(内部开头)
    "prependTo": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.insertBefore(node, el.childNodes[0]);
        return node;
    },

    // 删除结点
    "remove": function (el) {
        el.parentNode.removeChild(el);
    },

    // 在被指定元素之后插入结点
    "after": function (el, template) {
        var node = isElement(template) ? template : this.toNode(template);
        el.parentNode.insertBefore(node, el.nextSibling);
        return node;
    },

    // 修改样式
    "css": function (el, styles) {
        for (var key in styles) {
            el.style[key] = styles[key];
        }
    },

    // 修改属性
    "attr": function (el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    },

    // 获取鼠标相对特定元素左上角位置
    "position": function (el, event) {

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
    },

    // 复制到剪切板
    "copy": function (text, callback, errorback) {

        var el = this.appendTo(document.body, '<textarea>' + text + '</textarea>');

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

    }

};