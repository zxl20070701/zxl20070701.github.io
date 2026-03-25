// 兼容老IE浏览器
// 请不要使用event.srcElement获取
// https://dom.spec.whatwg.org/#dom-event-srcelement
if ('target' in Event.prototype === false) {
    Object.defineProperty(Event.prototype, 'target', {
        get: function () {
            return this.srcElement;
        }
    });
}

// 取消冒泡事件
// 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理
// 此方法不会影响当前节点中的任何事件侦听器
// 如果需要取消包括本结点的方法，应该使用stopImmediatePropagation()
// https://dom.spec.whatwg.org/#dom-event-stopimmediatepropagation
if ('stopPropagation' in Event.prototype === false) {
    Event.prototype.stopPropagation = function () {
        this.cancelBubble = true;
    };
}

// 阻止默认事件
// https://dom.spec.whatwg.org/#dom-event-preventdefault
if ('preventDefault' in Event.prototype === false) {
    Event.prototype.preventDefault = function () {
        this.returnValue = false;
    };
}

// 获取键盘按下键编码
// https://www.w3.org/TR/uievents/#dom-keyboardevent-which
if ('keyCode' in Event.prototype === false) {
    Object.defineProperty(Event.prototype, 'keyCode', {
        get: function () {
            return this.which || this.charCode;
        }
    });
}
