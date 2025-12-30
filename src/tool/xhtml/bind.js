// 绑定事件
var bindEvent = function (dom, eventType, callback) {

    if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
            bindEvent(dom[i], eventType, callback);
        }
        return;
    }

    if (window.attachEvent)
        dom.attachEvent("on" + eventType, callback);
    else
        dom.addEventListener(eventType, callback, false);
};

export default bindEvent;