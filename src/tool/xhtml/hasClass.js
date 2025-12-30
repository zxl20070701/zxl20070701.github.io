// 判断结点是否有指定class
// clazzs可以是字符串或数组字符串
// notStrict可选，boolean值，默认false表示结点必须包含全部class,true表示至少包含一个即可
export default function (dom, clazzs, notStrict) {
    if (clazzs.constructor !== Array) clazzs = [clazzs];

    var class_str = " " + (dom.getAttribute('class') || "") + " ";
    for (var i = 0; i < clazzs.length; i++) {
        if (class_str.indexOf(" " + clazzs[i] + " ") >= 0) {
            if (notStrict) return true;
        } else {
            if (!notStrict) return false;
        }
    }
    return true;
};