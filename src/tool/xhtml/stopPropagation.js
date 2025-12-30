// 阻止冒泡
export default function (event) {
    event = event || window.event;
    if (event.stopPropagation) { //这是其他非IE浏览器
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
};