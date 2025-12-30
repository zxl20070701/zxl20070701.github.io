  // 触发事件
  export default function (dom, eventType) {
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

};