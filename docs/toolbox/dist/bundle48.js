
/*************************** [bundle] ****************************/
// Original file:./src/dialogs/api/pages/canvas/index.js
/*****************************************************************/
window.__pkg__bundleSrc__['117']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_args__=window.__pkg__getBundle('356');
var template =__pkg__scope_args__.default;


__pkg__scope_bundle__.default= function (obj) {
    return {
        render: template
    }
};

    return __pkg__scope_bundle__;
}

/*************************** [bundle] ****************************/
// Original file:./src/dialogs/api/pages/canvas/index.html
/*****************************************************************/
window.__pkg__bundleSrc__['356']=function(){
    var __pkg__scope_bundle__={};
    var __pkg__scope_args__;
    __pkg__scope_bundle__.default= [{"type":"tag","name":"root","attrs":{},"childNodes":[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125,127,129,131,133,135,137,139,141,143,145,147,149,151,153,155,157,159,161,163,165,167,169,171,173,175,177,179,181,183,185,187,189,191,193,195,197,199,201,203]},{"type":"tag","name":"header","attrs":{},"childNodes":[2]},{"type":"text","content":"位图画笔 Canvas","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[4]},{"type":"text","content":"引入","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[6]},{"type":"text","content":"import canvasRender from './src/tool/canvas/index';","childNodes":[]},{"type":"tag","name":"h2","attrs":{},"childNodes":[8]},{"type":"text","content":"使用","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[10]},{"type":"text","content":"传递一个canvas结点，返回的是一个画笔对象：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[12]},{"type":"text","content":"var painter = canvasRender(document.getElementsByTagName('canvas')[0], width, height);","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"warn"},"childNodes":[14]},{"type":"text","content":"温馨提示：width和height可选，可以使用默认值。","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[16]},{"type":"text","content":"配置画笔","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[18]},{"type":"text","content":"painter.config({\r\n    // 填充色或图案\r\n    \"fillStyle\": 'black',\r\n\r\n    // 轮廓色或图案\r\n    \"strokeStyle\": 'black',\r\n\r\n    // 线的端点类型，（\"butt\"平直边缘、\"round\"半圆和\"square\"矩形）\r\n    \"lineCap\": \"butt\",\r\n\r\n    // 线的拐角连接方式，（\"miter\"连接处边缘延长相接、\"bevel\"对角线斜角和\"round\"圆）\r\n    \"lineJoin\": \"miter\",\r\n\r\n    // 线条宽度(单位px，下同)\r\n    \"lineWidth\": 1,\r\n\r\n    // 设置线条虚线，应该是一个数组[number,...]\r\n    \"lineDash\": [],\r\n\r\n    // 文字水平对齐方式（\"left\"左对齐、\"center\"居中和\"right\"右对齐）\r\n    \"textAlign\": 'left',\r\n\r\n    // 文字垂直对齐方式（\"middle\"垂直居中、\"top\"上对齐和\"bottom\"下对齐）\r\n    \"textBaseline\": 'middle',\r\n\r\n    // 阴影的模糊系数，默认0，也就是无阴影\r\n    \"shadowBlur\": 0,\r\n\r\n    // 阴影的颜色\r\n    \"shadowColor\": \"black\",\r\n\r\n    // 文字大小\r\n    \"fontSize\": 16,\r\n\r\n    // 字体\r\n    \"fontFamily\": \"sans-serif\",\r\n\r\n    // 字重\r\n    \"fontWeight\": 400,\r\n\r\n    // 字类型\r\n    \"fontStyle\": \"normal\",\r\n\r\n    // 圆弧开始端闭合方式（\"butt\"直线闭合、\"round\"圆帽闭合）\r\n    \"arcStartCap\": 'butt',\r\n\r\n    // 圆弧结束端闭合方式，和上一个类似\r\n    \"arcEndCap\": 'butt'\r\n});","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[20]},{"type":"text","content":"画笔方法","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[22]},{"type":"text","content":"文字","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[24]},{"type":"text","content":"在点(x, y)处绘制填充的文字text；deg表示文字旋转角度，可选：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[26]},{"type":"text","content":"painter.fillText(text, x, y[, deg]);","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"warn"},"childNodes":[28]},{"type":"text","content":"除非特别说明，角度全部采用弧度制。","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[30]},{"type":"text","content":"在点(x, y)处绘制轮廓的文字text；deg表示文字旋转角度，可选：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[32]},{"type":"text","content":"painter.strokeText(text, x, y[, deg]);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[34]},{"type":"text","content":"在点(x, y)处绘制轮廓并填充的文字text；deg表示文字旋转角度，可选：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[36]},{"type":"text","content":"painter.fullText(text, x, y[, deg]);","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[38]},{"type":"text","content":"弧","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[40]},{"type":"text","content":"以(cx, cy)为圆心，内外半径分别是r1和r2，从弧度beginDeg开始，跨越弧度deg，绘制填充圆弧：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[42]},{"type":"text","content":"painter.fillArc(cx, cy, r1, r2, beginDeg, deg);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[44]},{"type":"text","content":"和fillArc方法类似，只不过绘制的是轮廓圆弧：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[46]},{"type":"text","content":"painter.strokeArc(cx, cy, r1, r2, beginDeg, deg);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[48]},{"type":"text","content":"和fillArc方法类似，只不过绘制的是轮廓并填充圆弧：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[50]},{"type":"text","content":"painter.fullArc(cx, cy, r1, r2, beginDeg, deg);","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[52]},{"type":"text","content":"圆形","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[54]},{"type":"text","content":"以(cx, cy)为圆心，半径r绘制填充圆形：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[56]},{"type":"text","content":"painter.fillCircle(cx, cy, r);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[58]},{"type":"text","content":"以(cx, cy)为圆心，半径r绘制轮廓圆形：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[60]},{"type":"text","content":"painter.strokeCircle(cx, cy, r);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[62]},{"type":"text","content":"以(cx, cy)为圆心，半径r绘制轮廓并填充圆形：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[64]},{"type":"text","content":"painter.fullCircle(cx, cy, r);","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[66]},{"type":"text","content":"矩形","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[68]},{"type":"text","content":"以(x, y)为左上角，宽width，高height绘制填充矩形：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[70]},{"type":"text","content":"painter.fillRect(x, y, width, height);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[72]},{"type":"text","content":"以(x, y)为左上角，宽width，高height绘制轮廓矩形：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[74]},{"type":"text","content":"painter.strokeRect(x, y, width, height);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[76]},{"type":"text","content":"以(x, y)为左上角，宽width，高height绘制轮廓并填充矩形：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[78]},{"type":"text","content":"painter.fullRect(x, y, width, height);","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[80]},{"type":"text","content":"路径","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[82]},{"type":"text","content":"基于路径可以绘制几乎大部分图形，非常类似画笔在纸上划动。","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[84]},{"type":"text","content":"开始一段独立的路径：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[86]},{"type":"text","content":"painter.beginPath();","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[88]},{"type":"text","content":"闭合当前路径，也就是路径首尾闭合：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[90]},{"type":"text","content":"painter.closePath();","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[92]},{"type":"text","content":"画笔移动到点(x, y)，此时笔离开了画布：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[94]},{"type":"text","content":"painter.moveTo(x, y);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[96]},{"type":"text","content":"画笔移动到点(x, y)，此时笔没有离开画布：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[98]},{"type":"text","content":"painter.lineTo(x, y);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[100]},{"type":"text","content":"以(cx, cy)为圆心，半径r，从弧度beginDeg开始，跨越弧度deg画弧，此时笔没有离开画布：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[102]},{"type":"text","content":"painter.arc(cx, cy, r, beginDeg, deg);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[104]},{"type":"text","content":"二次贝塞尔曲线到：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[106]},{"type":"text","content":"painter.quadraticCurveTo(cpx, cpy, x, y);","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"warn"},"childNodes":[108]},{"type":"text","content":"只有一个控制点p(cpx, cpy),画笔当前的位置和p(x, y)分别是起点和终点。","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[110]},{"type":"text","content":"三次贝塞尔曲线到：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[112]},{"type":"text","content":"painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"warn"},"childNodes":[114]},{"type":"text","content":"有两个控制点p(cp1x, cp1y)和p(cp2x, cp2y),画笔当前的位置和p(x, y)分别是起点和终点。","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[116]},{"type":"text","content":"把当前路径包裹的区域填充颜色：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[118]},{"type":"text","content":"painter.fill();","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[120]},{"type":"text","content":"把当前路径上色（轮廓线）：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[122]},{"type":"text","content":"painter.stroke();","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[124]},{"type":"text","content":"把当前路径画上轮廓线并填充颜色到当前路径所包裹的区域：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[126]},{"type":"text","content":"painter.full();","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[128]},{"type":"text","content":"暂存当前路径：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[130]},{"type":"text","content":"painter.save();","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[132]},{"type":"text","content":"恢复上次暂存路径：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[134]},{"type":"text","content":"painter.restore();","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[136]},{"type":"text","content":"擦除画面","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[138]},{"type":"text","content":"painter.clearRect(x, y, w, h);","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[140]},{"type":"text","content":"painter.clearCircle(cx, cy, r);","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[142]},{"type":"text","content":"转Base64","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[144]},{"type":"text","content":"painter.toDataURL();","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[146]},{"type":"text","content":"获取指定位置颜色","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[148]},{"type":"text","content":"painter.getColor(x, y);","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[150]},{"type":"text","content":"绘制图片","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[152]},{"type":"text","content":"painter.drawImage(img, sx, sy, sw, sh, x, y, w, h);","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[154]},{"type":"text","content":"渐变色","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[156]},{"type":"text","content":"除了使用纯色填充，还可以使用渐变色作为画笔的颜色，你把它看成普通的颜色使用就可以了。","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[158]},{"type":"text","content":"线性渐变","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[160]},{"type":"text","content":"首先你需要使用画笔的createLinearGradient创建线性渐变对象，四个参数分别表示渐变的起点P(x1, y1)和终点P(x2, y2)：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[162]},{"type":"text","content":"var linearGradient = painter.createLinearGradient(x1, y1, x2, y2);","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"warn"},"childNodes":[164]},{"type":"text","content":"温馨提示：canvas画笔上述参数的单位是px，svg画笔上述参数是%，请一定要注意区分（下同）。","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[166]},{"type":"text","content":"环形渐变","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[168]},{"type":"text","content":"同样的，你需要使用画笔的createRadialGradient创建环形渐变对象，三个参数分别表示渐变的圆心P(cx, cy)和半径r：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[170]},{"type":"text","content":"var radialGradient = painter.createRadialGradient(cx, cy, r1, r2);","childNodes":[]},{"type":"tag","name":"p","attrs":{"class":"warn"},"childNodes":[172]},{"type":"text","content":"温馨提示：渐变的起点是圆心。","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[174]},{"type":"text","content":"设置与使用","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[176]},{"type":"text","content":"设置渐变范围以后，你需要在渐变范围中添加渐变色，可以添加任意多个：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[178]},{"type":"text","content":"XXXGradient.addColorStop(deep, color);","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[180]},{"type":"text","content":"上述deep取值为闭区间[0, 1]，color可以是任意合法的颜色值。","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[182]},{"type":"text","content":"渐变如何使用，直接调用渐变的value方法即可：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[184]},{"type":"text","content":"painter.config({\r\n    \"fillStyle\": XXXGradient.value()\r\n});","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[186]},{"type":"text","content":"比如上面，我们给画笔设置填充色就是使用了我们刚刚获取的渐变色。","childNodes":[]},{"type":"tag","name":"h3","attrs":{},"childNodes":[188]},{"type":"text","content":"区域管理","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[190]},{"type":"text","content":"有时候，我们可能需要和绘制的图表进行交互，比如点击的时候，需要知道点击的是哪个区域，就可以在引入的时候修改一下：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[192]},{"type":"text","content":"import canvasRender from './src/tool/canvas/region';","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[194]},{"type":"text","content":"如此，使用起来还是和之前一样，只不过多了管理区域的方法。","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[196]},{"type":"text","content":"设置区域","childNodes":[]},{"type":"tag","name":"p","attrs":{},"childNodes":[198]},{"type":"text","content":"每次绘制一个区域前修改一下区域的名称，那么绘制的内容就会被记录起来：","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[200]},{"type":"text","content":"painter.setRegion(regionName);","childNodes":[]},{"type":"tag","name":"h4","attrs":{},"childNodes":[202]},{"type":"text","content":"获取区域","childNodes":[]},{"type":"tag","name":"pre","attrs":{},"childNodes":[204]},{"type":"text","content":"document.getElementsByTagName('canvas')[0].addEventListener(\"click\", function (event) {\r\n\r\n    // 打印当前点击在哪个区域\r\n    console.log(painter.getRegion(event));\r\n});","childNodes":[]}]

    return __pkg__scope_bundle__;
}