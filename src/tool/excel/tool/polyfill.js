export function getTargetNode(event) {
    var _event = event || window.event;
    return _event.target || _event.srcElement;
};