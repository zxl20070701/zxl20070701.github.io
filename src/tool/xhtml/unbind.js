// 去掉绑定事件
var unbindEvent = function (dom, eventType, handler) {

    if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
            unbindEvent(dom[i], eventType, handler);
        }
        return;
    }

    if (window.detachEvent)
        dom.detachEvent('on' + eventType, handler);
    else
        dom.removeEventListener(eventType, handler, false);

};

export default unbindEvent;