// 如果time不是空，说明当前打开前，已经有这个页面打开了，无需更新打开时间
var time = localStorage.getItem('stayTime');
if (!time) {
    localStorage.setItem('stayTime', new Date().valueOf());
}

// 记录打开页面的个数
var count = localStorage.getItem('stayTime@count') || 0;
localStorage.setItem('stayTime@count', 1 - - count);

var doBeforeunload = function () {

    var _count = +localStorage.getItem('stayTime@count');

    _count < 1 ? 1 : _count;
    localStorage.setItem('stayTime@count', _count - 1);

    // 说明当前页面是最后一个页签
    if (_count - 1 <= 0) {

        var stayTime = localStorage.getItem('stayTime');

        var _time = stayTime ? (new Date().valueOf()) - stayTime : 0;
        localStorage.setItem('stayTime@result', _time);

        localStorage.removeItem('stayTime');
        localStorage.removeItem('stayTime@count');
    }

};

window.onbeforeunload = doBeforeunload;

setTimeout(function () {
    console.log("上次窗口停留的时间是：" + (localStorage.getItem("stayTime@result") || 0) + "ms");
});